import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../components/Error";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import UserHome from "../layout/user/UserHome";
import PrivateRoute from "./PrivateRoute";
import TransactionHistory from "../layout/user/TransactionHistory";
import Login from "../pages/Login";
import AgentHome from "../layout/agent/AgentHome";
import AdminHome from "../layout/admin/AdminHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: "/user",
                element: <PrivateRoute><UserHome/></PrivateRoute>
            },
            {
                path: "/transaction-history",
                element: <PrivateRoute><TransactionHistory/></PrivateRoute>
            },
            {
                path: "/agent",
                element: <AgentHome/>
            },
            {
                path: "/admin",
                element: <AdminHome />
            },
            {
                path: "/register",
                element: <Registration/>
            },
            {
                path: "/login",
                element: <Login/>
            },

        ]
    },
]);

export default router;