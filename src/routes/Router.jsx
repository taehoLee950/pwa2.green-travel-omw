import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import Main from "../components/main/Main.jsx";
import Festival from "../components/festival/Festival.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
