import { hydrateRoot, Root } from "react-dom";
import { getPage } from "vite-plugin-ssr/client";
import { PageShell } from "./PageShell";
import { useClientRouter } from "vite-plugin-ssr/client/router";
import type { PageContext } from "./types";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Suspense, useTransition } from "react";
import { Spinner } from "@chakra-ui/react";

let root: Root | null = null;
const { hydrationPromise } = useClientRouter({
  async render(pageContext) {
    const { Page, pageProps } = pageContext;

    const el = (
      <Suspense fallback={<div>Loading...</div>}>
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
      </Suspense>
    );

    console.log("about to render", root);

    if (root) {
      root.render(el);
    } else {
      root = hydrateRoot(document.getElementById("page-view")!, el);
    }
    // // `pageContext.isHydration` is set by `vite-plugin-ssr` and is `true` when the page
    // // is already rendered to HTML.
    // if (pageContext.isHydration) {
    //   // When we render the first page. (Since we do SSR, the first page is already
    //   // rendered to HTML and we merely have to hydrate it.)
    //   await hydrate(pageContext.Page)
    // } else {
    //   // When the user navigates to a new page.
    //   await render(pageContext.Page)
    // }
  },

  ensureHydration: false,

  // Prefetch `<a>` links when they appear in the user's viewport.
  // We can override individual links: `<a data-prefetch="true" href="/some-link" />`.
  // Default value: `false`.
  prefetchLinks: true,

  // To create custom page transition animations
  onTransitionStart() {
    NProgress.start();
  },
  onTransitionEnd() {
    NProgress.done();
  },
});

hydrationPromise.then(() => {
  console.log("Hydration finished; page is now interactive.");
});

// hydrate();

// async function hydrate() {
//   // We do Server Routing, but we can also do Client Routing by using `useClientRouter()`
//   // instead of `getPage()`, see https://vite-plugin-ssr.com/useClientRouter
//   const pageContext = await getPage<PageContextBuiltInClient & PageContext>();

//   const { Page, pageProps } = pageContext;

//   hydrateRoot(
//     document.getElementById("page-view")!,
//     <PageShell pageContext={pageContext}>
//       <Page {...pageProps} />
//     </PageShell>
//   );
// }
