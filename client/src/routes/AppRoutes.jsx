import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../layouts/MainLayout";
import LazyLoader from "../components/LazyLoader";

const Hero = lazy(() => import("../pages/Hero"));
const Tasks = lazy(() => import("../pages/Tasks"));
const NewTask = lazy(() => import("../pages/NewTask"));
const EditTask = lazy(() => import("../pages/EditTask"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Notes = lazy(() => import("../pages/Notes"));
const NewNote = lazy(() => import("../pages/NewNote"));
const EditNote = lazy(() => import("../pages/EditNote"));

function withSuspense(Component) {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Component />
    </Suspense>
  );
}

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: withSuspense(Hero) },
        { path: "tasks", element: withSuspense(Tasks) },
        { path: "tasks/new", element: withSuspense(NewTask) },
        { path: "tasks/:id/edit", element: withSuspense(EditTask) },
        { path: "login", element: withSuspense(Login) },
        { path: "register", element: withSuspense(Register) },
        { path: "notes", element: withSuspense(Notes) },
        { path: "notes/new", element: withSuspense(NewNote) },
        { path: "notes/:id/edit", element: withSuspense(EditNote) },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
