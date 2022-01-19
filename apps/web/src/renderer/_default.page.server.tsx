import { renderToPipeableStream } from "react-dom/server";
import { PageShell } from "./PageShell";
import { escapeInject } from "vite-plugin-ssr";
import type { PageContext } from "./types";
import type { PageContextBuiltIn } from "vite-plugin-ssr";
import { PassThrough } from "stream";
import { createEnvironment, PromiseAllDynamic } from "../environment";
import { Suspense } from "react";

export { render };
// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ["pageProps", "urlPathname"];

async function render(pageContext: PageContextBuiltIn & PageContext) {
  const { Page, pageProps } = pageContext;
  const environment = createEnvironment();

  const stream = new PassThrough({});

  const { pipe, abort } = renderToPipeableStream(
    <Suspense fallback={null}>
      <PageShell environment={environment} pageContext={pageContext}>
        <Page {...pageProps} />
      </PageShell>
    </Suspense>,
    {
      onCompleteAll() {
        stream.write(
          `<script type="application/json" id="relay--records">${JSON.stringify(
            environment.getStore().getSource().toJSON()
          )}</script>`
        );
      },
    }
  );

  pipe(stream);

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext;
  const title = (documentProps && documentProps.title) || "Vite SSR app";
  const desc =
    (documentProps && documentProps.description) ||
    "App using Vite + vite-plugin-ssr";

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    pageContext: {},
  };
}
