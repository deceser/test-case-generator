import HomePage from "../pages/home";
import MainPage from "../pages/main";
import AuthGoogleComponent from "../pages/AuthGoogleComponent";
import UiPage from "../pages/ui";

export const privateRoutes = [
  { path: "/service", component: MainPage },
  { path: "auth/google", component: AuthGoogleComponent },
  { path: "/ui", component: UiPage },
];

export const publicRoutes = [{ path: "/", component: HomePage }];
