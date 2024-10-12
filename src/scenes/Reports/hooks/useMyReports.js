import { useEffect, useState } from "react";
import { useUuid } from "../../../hooks";
import { mapReports, groupReports } from "../../../utility";

export const useMyReports = () => {
    const uuid = useUuid();
    const [reports, setReports] = useState([]);
    const [groupedReports, setGroupedReports] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // @ts-ignore
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v0/issues/my`;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "X-User-UUID": uuid,
                    },
                });
                const data = await response.json();

                const mappedReports = mapReports(data);
                // @ts-ignore
                const groupedReports = groupReports(mappedReports);

                setReports(mappedReports);
                setGroupedReports(groupedReports);
            } catch (error) {
                console.log("error", error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [uuid]);

    return { reports, groupedReports, isLoading };
};
