import { createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import App from "./App";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/signup",
		element: <Signup />,
	},
	{
		path: "/signin",
		element: <Signin />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);
