import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Layout } from "./Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Index } from "./Index";
import { Register } from "./Register";
const basename = import.meta.env.PROD ? "/account" : "/";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="account" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="charge" element={<Index />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
