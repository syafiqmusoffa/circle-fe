import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import PassReset from "../pages/PassReset";
import ProtectedRuoteLayout from "./ProtectedRuote";
import Profile from "../pages/Profile";
import Follows from "../pages/Follows";
import DetailThread from "../pages/DetailThread";
import NotFound from "@/pages/NotFound";
import UserSearch from "../pages/Search";
import { ProfileOther } from "@/pages/ProfileOther";


let router = createBrowserRouter([
  {
    Component: ProtectedRuoteLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/profile/:username",
        Component: ProfileOther,
      },
      {
        path: "/search",
        Component: UserSearch,
      },
      {
        path: "/follow",
        Component: Follows,
      },
      {
        path: "/thread/:id",
        Component: DetailThread,
      },
      {
        path: "/404",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot",
    Component: ForgotPassword,
  },
  {
    path: "/reset",
    Component: PassReset,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
