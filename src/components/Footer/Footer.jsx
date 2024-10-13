import React from "react";

import { Anchor, Text } from "@mantine/core";
import classes from "./Footer.module.css";

export function Footer() {
    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Text size="sm">© 2024 city-24</Text>
                <Anchor
                    className={classes.link}
                    href="#"
                    underline="hover"
                    onClick={(e) => {
                        window.location.href = "mailto:no-reply@example.com";
                        e.preventDefault();
                    }}
                    size="sm"
                >
                    Связаться с нами
                </Anchor>
            </div>
        </div>
    );
}
