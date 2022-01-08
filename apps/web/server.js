// @ts-check
const fs = require("fs");
const path = require("path");
const express = require("express");

const root = __dirname;
const isProd = process.env.NODE_ENV === "production";
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const indexProd = isProd
    ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await require("vite").createServer({
      root,
      logLevel: "info",
      server: {
        middlewareMode: "ssr",
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression")());
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = indexProd;
        render = require("./dist/server/entry-server.js").render;
      }

      render({
        template,
        url,
        req,
        res,
        dev: !isProd,
      });

      // TODO:
      // if (context.url) {
      //   // Somewhere a `<Redirect>` was rendered
      //   return res.redirect(301, context.url);
      // }
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log("Started on http://localhost:3000");
  })
);
