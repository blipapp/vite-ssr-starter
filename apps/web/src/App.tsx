import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { useState } from "react";
import { createEnvironment } from "./environment";
import { ChakraProvider } from "@chakra-ui/react";

export function App({ environment, helmetContext = {} }) {
  const [env] = useState(() => {
    if (typeof window === "undefined") {
      return environment || createEnvironment().environment;
    }

    const recordsEl = document.getElementById("relay--records");

    const records =
      recordsEl && recordsEl.innerText && JSON.parse(recordsEl.innerText);

    return createEnvironment({ records }).environment;
  });

  return (
    <Suspense fallback={null}>
      <HelmetProvider context={helmetContext}>
        <ChakraProvider>
          <RelayEnvironmentProvider environment={env}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </RelayEnvironmentProvider>
        </ChakraProvider>
      </HelmetProvider>
    </Suspense>
  );
}
