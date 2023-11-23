import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import User from "../pages/User";
import UserDetail from "../pages/UserDetail";
import EditUserForm from "../pages/EditUserForm";
import AddUserForm from "../pages/AddUserForm";

// Page configuration path react router dom
const router = createBrowserRouter([
    {
        path: "/",
        element: <User />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/add",
        element: <AddUserForm />
    },
    {
        path: "/user/:id",
        element: <UserDetail />
    },
    {
        path: "/user/edit/:id",
        element: <EditUserForm />
    }
])

export default router;