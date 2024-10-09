import { useEffect } from "react";

export const useUuid = () => {
    const key = "uuid";
    const generatedUUID = crypto.randomUUID();

    useEffect(() => {
        const storedUUID = localStorage.getItem(key);
        if (!storedUUID) {
            localStorage.setItem(key, generatedUUID);
        }
    }, []);

    return localStorage.getItem(key) || generatedUUID;
};
