import { Navigate, type RouteObject } from "react-router";
import App from "../App";
import Recipe from "../App/pages/Recipe";
import RecipesList from "../App/pages/RecipesList";
import Register from "../App/pages/Auth/Register";
import Login from "../App/pages/Auth/Login";
import Favorites from "../App/pages/Favorites";
import Profile from "../App/pages/Profile";
import RequireAuth from "components/RequireAuth";
import { routes } from './routes'

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        index: true,
        element: <RecipesList />
      },
      {
        path: routes.recipe.mask,
        element: <Recipe />
      },
      {
        path: routes.register.mask,
        element: <Register />
      },
      {
        path: routes.login.mask,
        element: <Login />
      },

      {
        element: <RequireAuth />,
        children: [
          {
            path: routes.favorites.mask,
            element: <Favorites />
          },
          {
            path: routes.profile.mask,
            element: <Profile />
          }
        ]
      },
      {
        path: "*",
        element: <Navigate to={routes.main.mask} replace />,
      }
    ]
  }
];