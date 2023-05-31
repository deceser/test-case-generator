import HomePage from "../pages/home";
import MainPage from "../pages/main";
import AuthGoogleComponent from "../pages/AuthGoogleComponent";

export const privateRoutes = [
  { path: "/", component: MainPage },
  { path: "auth/google", component: AuthGoogleComponent },
];

export const publicRoutes = [{ path: "/", component: HomePage }];
