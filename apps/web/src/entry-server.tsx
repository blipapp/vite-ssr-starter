import { StaticRouter } from "react-router-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { Response, Request } from "express";
import { Writable } from "stream";
import { FilledContext } from "react-helmet-async";
import { App } from "./App";
import { Html } from "./Html";
import { getErrorMarkup } from "./utils/error";
import { createEnvironment } from "./environment";

interface RenderProps {
  url: string;
  template: string;
  res: Response;
  req: Request;
  dev?: boolean;
}

/**
 * If a query is taking too long, or something else went wrong,
 * send back a response containing the Suspense fallback and rely
 * on the client to hydrate and build the React tree.
 */
const STREAM_ABORT_TIMEOUT_MS = 10000;

export function render({ url, template, req, res, dev }: RenderProps) {
  const head = template.match(/<head>(.+?)<\/head>/s)![1];

  let didError = false;
  const helmetContext = {} as FilledContext;

  res.setHeader("Content-type", "text/html");

  const { environment, source } = createEnvironment();
  const { pipe, abort } = renderToPipeableStream(
    <Html head={head}>
      <StaticRouter location={url}>
        <App environment={environment} helmetContext={helmetContext} />
      </StaticRouter>
    </Html>,
    {
      onCompleteShell() {
        // If something errored before we started streaming, we set the error code appropriately.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        res.write("<!DOCTYPE html>");

        pipe(res);
      },

      onCompleteAll() {
        res.write(
          `<script type="application/json" id="relay--records">${JSON.stringify(
            source.toJSON()
          )}</script>`
        );

        // TODO: Serialize state here:
        clearTimeout(streamTimeout);
      },

      onError(error: any) {
        didError = true;

        if (dev && res.headersSent) {
          res.write(getErrorMarkup(error));
        }

        console.error(error);
      },
    }
  );

  const streamTimeout = setTimeout(() => {
    console.log("TIMEOUT");
    const errorMessage = `The app failed to stream after ${STREAM_ABORT_TIMEOUT_MS} ms`;

    if (dev && res.headersSent) {
      res.write(getErrorMarkup(new Error(errorMessage)));
    }

    abort();
  }, STREAM_ABORT_TIMEOUT_MS);
}
