import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import App from "./components/Home";
import { About } from "./components/About";
import { Nft } from "./components/Nft";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
        index: true,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/nft",
        element: <Nft />,
      },
    ],
  },
]);
