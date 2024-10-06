import React from "react";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";
import "./utility/polyfills/groupBy";

import { Home, ReportDetails, Reports } from "./pages";
import Root from "./Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/reports",
                element: <Reports />,
            },
            {
                path: "/details/:id",
                element: <ReportDetails />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
            <RouterProvider router={router} />
    </React.StrictMode>
);
