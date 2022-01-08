import { Route, Routes } from "react-router-dom";
// import { ChakraProvider } from "@chakra-ui/react";
import { Html } from "./Html";

import About from "./pages/About";
import Home from "./pages/Home";

export function App() {
  const cacheKey = Math.random();

  return (
    <Html>
      {/* <ChakraProvider> */}
          <Routes>
            <Route path="/about" element={<About cacheKey={cacheKey} />} />
            <Route path="/" element={<Home />} />
          </Routes>
      {/* </ChakraProvider> */}
    </Html>
  );
}
