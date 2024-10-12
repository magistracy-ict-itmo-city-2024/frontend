import React from "react";
import { Text } from "@mantine/core";

export const Logo = (props) => {
    return (
        <Text
            component="span"
            fw={900}
            variant="gradient"
            gradient={{ from: "indigo", to: "teal", deg: 50 }}
            size="xl"
            inherit={props.inherit}
        >
            Город-24
        </Text>
    );
};
