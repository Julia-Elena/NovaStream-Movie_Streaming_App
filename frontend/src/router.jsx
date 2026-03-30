import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AddContent from "./components/AddContent";
import Watchlist from "./components/Watchlist";
import History from "./components/History";
import Settings from "./components/Settings";

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
		element: (
			<PrivateRoute>
				<Dashboard />
			</PrivateRoute>
		),
	},
	{
		path: "/addcontent",
		element: (
			<PrivateRoute>
				<AddContent />
			</PrivateRoute>
		),
	},
	{
		path: "/watchlist",
		element: (
			<PrivateRoute>
				<Watchlist />
			</PrivateRoute>
		),
	},
	{
		path: "/history",
		element: (
			<PrivateRoute>
				<History />
			</PrivateRoute>
		),
	},
	{
		path: "/settings",
		element: (
			<PrivateRoute>
				<Settings />
			</PrivateRoute>
		),
	},
]);
