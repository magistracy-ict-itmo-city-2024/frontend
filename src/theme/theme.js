import { createTheme } from "@mantine/core";

import text from "./components/Text.module.css";

export const theme = createTheme({
    primaryColor: "indigo",
    components: {
        Text: {
            classNames: {
                root: text.root,
            },
        },
    },
});
