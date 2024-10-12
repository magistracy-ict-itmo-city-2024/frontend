import React from "react";
import ReactDOM from "react-dom/client";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@mantine/core/styles.layer.css";
import "@mantine/dropzone/styles.css";
import "./utility/polyfills/groupBy";

import { theme } from "./theme";
import { Home, ReportDetails, Reports } from "./scenes";
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
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>
);
