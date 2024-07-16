import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../components/Error";
import UserPage from "../layout/user/UserPage";
import AgentPage from "../layout/agent/AgentPage";
import AdminPage from "../layout/admin/AdminPage";
import Home from "../pages/Home";
import Registration from "../pages/Registration";
import UserHome from "../layout/user/UserHome";
import PrivateRoute from "./PrivateRoute";

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
                element: <UserPage />
            },
            {
                path: "/userHome",
                element: <PrivateRoute><UserHome/></PrivateRoute>
            },
            {
                path: "/agent",
                element: <AgentPage />
            },
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/register",
                element: <Registration/>
            },

        ]
    },
]);

export default router;