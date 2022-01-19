import React, { useState } from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { Link } from "./Link";
import { ChakraProvider } from "@chakra-ui/react";
import { Environment, RelayEnvironmentProvider } from "react-relay";
import { createEnvironment } from "../environment";

export { PageShell };

function PageShell({
  children,
  environment,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
  environment?: Environment;
}) {
  const [env] = useState(() => {
    if (typeof window === "undefined") {
      return environment || createEnvironment();
    }

    const recordsEl = document.getElementById("relay--records");

    const records =
      recordsEl && recordsEl.innerText && JSON.parse(recordsEl.innerText);

    return createEnvironment({ records });
  });

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ChakraProvider>
          <RelayEnvironmentProvider environment={env}>
            <Layout>
              <Sidebar>
                <Logo />
                <Link className="navitem" href="/">
                  Home
                </Link>
                <Link className="navitem" href="/about">
                  About
                </Link>
              </Sidebar>
              <Content>{children}</Content>
            </Layout>
          </RelayEnvironmentProvider>
        </ChakraProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        maxWidth: 900,
        margin: "auto",
      }}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: "1.8em",
      }}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: "2px solid #eee",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img height={64} width={64} alt="logo" />
      </a>
    </div>
  );
}
