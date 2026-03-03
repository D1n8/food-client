import type { RouteObject } from "react-router";
import App from "../App";
import Recipe from "../App/pages/Recipe";
import RecipesList from "../App/pages/RecipesList";
import Register from "../App/pages/Auth/Register";
import Login from "../App/pages/Auth/Login";
import Favorites from "../App/pages/Favorites";
import Profile from "../App/pages/Profile";
import RequireAuth from "components/RequireAuth";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <RecipesList />
      },
      {
        path: '/recipes/:id',
        element: <Recipe />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },

      {
        element: <RequireAuth />,
        children: [
          {
            path: '/favorites',
            element: <Favorites />
          },
          {
            path: '/profile',
            element: <Profile />
          }
        ]
      }
    ]
  }
];