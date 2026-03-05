import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Hero from "../pages/Hero";
import Tasks from "../pages/Tasks";
import NewTask from "../pages/NewTask";
import EditTask from "../pages/EditTask";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Hero /> },
        { path: "tasks", element: <Tasks /> },
        { path: "tasks/new", element: <NewTask /> },
        {path: "tasks/:id/edit",element: <EditTask />},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}