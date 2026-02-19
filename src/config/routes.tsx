import type { RouteObject } from "react-router";
import App from "../App";
import Recipe from "../App/pages/Recipe";
import RecipesList from "../App/pages/RecipesList";

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
        {
            index: true,
            element: <RecipesList/>
        },
        {
            path: '/recipe/:id',
            element: <Recipe/>
        }
    ]
  }
];