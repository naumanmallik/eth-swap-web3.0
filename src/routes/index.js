import HelloWorldApp from "../components/HelloWorldApp/App";
import { Navigate, useRoutes } from "react-router-dom";
import Tasks from "../tasks";
import CreateTask from "../tasks/createTask";

export default function Routes() {
  return useRoutes([
    { path: "*", element: <Navigate replace to={"/list-tasks"} /> },
    { path: "/list-tasks", element: <Tasks /> },
    { path: "/create-task", element: <CreateTask /> },
    { path: "/hello", element: <HelloWorldApp /> },
  ]);
}
