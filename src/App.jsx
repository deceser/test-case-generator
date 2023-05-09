import React from "react";

import AppRouter from "./AppRouter";
import DefaultLayout from "./layouts/default";

const App = () => {
  return (
    <DefaultLayout>
      <AppRouter />
    </DefaultLayout>
  );
};

export default App;
