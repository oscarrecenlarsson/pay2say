import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import About from "./components/About";
import Nft from "./components/Nft";
import Admin from "./components/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
      {
        path: "/admin",
        element: <Admin />,
      },
    ],
  },
]);
