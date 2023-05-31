import HomePage from "../pages/home";
import MainPage from "../pages/main";

export const privateRoutes = [{ path: "/", component: MainPage }];

export const publicRoutes = [{ path: "/", component: HomePage }];
