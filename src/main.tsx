import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Index } from "./Index";
import { Forget } from "./Forget";
import { Register } from "./Register";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="forget" element={<Forget />} />
          <Route path="register" element={<Register />} />
          <Route path="account" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
