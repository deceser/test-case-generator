import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/home";

import { publicRoutes, privateRoutes } from "./routes";

const user = false;

const AppRouter = () => {
  return !user ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.component />} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.component />} />
      ))}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
