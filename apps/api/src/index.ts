import fastify from "fastify";
import { readFileSync } from "fs";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from "graphql-helix";
import { envelop, useSchema } from "@envelop/core";
import { makeExecutableSchema } from "@graphql-tools/schema";

const sleep = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));

const schema = makeExecutableSchema({
  typeDefs: readFileSync("./schema.graphql", "utf-8"),
  resolvers: {
    Query: {
      hello: () => "World",
      greetings: async function* () {
        for (const greeting of ["hi", "ho", "sup", "ola", "bonjour"]) {
          yield greeting;
          await sleep();
        }
      },
      me: () => ({ id: "1", name: "Vanja" }),
    },
    User: {
      bio: async () => {
        await sleep(1500);
        return "I like turtles";
      },
      friends: async function* () {
        for (const user of [
          { id: "2", name: "Angela" },
          { id: "3", name: "Christopher" },
          { id: "4", name: "Titiana" },
          { id: "5", name: "Leonard" },
          { id: "6", name: "Ernesto" },
        ]) {
          yield user;
          await sleep(1000);
        }
      },
    },
    Subscription: {
      clock: {
        subscribe: async function* () {
          while (true) {
            yield { clock: new Date().toString() };
            await sleep();
          }
        },
      },
    },
  },
});

const getEnveloped = envelop({
  plugins: [useSchema(schema)],
});

const app = fastify();

app.route({
  method: ["GET", "POST"],
  url: "/api/graphql",
  async handler(req, res) {
    // Artificially slow down responses:
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const { parse, validate, contextFactory, execute, schema } = getEnveloped({
      req,
    });

    const request = {
      body: req.body,
      headers: req.headers,
      method: req.method,
      query: req.query,
    };

    if (shouldRenderGraphiQL(request)) {
      res.type("text/html");
      res.send(
        renderGraphiQL({
          endpoint: "/api/graphql",
        })
      );
    } else {
      const request = {
        body: req.body,
        headers: req.headers,
        method: req.method,
        query: req.query,
      };
      const { operationName, query, variables } = getGraphQLParameters(request);
      const result = await processRequest({
        operationName,
        query,
        variables,
        request,
        schema,
        parse,
        validate,
        execute,
        contextFactory,
      });

      sendResult(result, res.raw);

      // Tell fastify a response was sent
      res.sent = true;
    }
  },
});

app.listen(3001, () => {
  console.log(`GraphQL server is running on http://127.0.0.1:3001/api/graphql`);
});
