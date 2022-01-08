import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { App } from "./App";

export function render(url: string, opts: any) {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  );
}
