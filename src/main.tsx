import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Index } from "./Index";
import { Register } from "./Register";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/account" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="charge" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
