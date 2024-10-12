import { useEffect, useState } from "react";
import { useUuid } from "../../../hooks";
import { mapReports } from "../../../utility/mapReport";

export const useReport = (id) => {
    const uuid = useUuid();
    const [report, setReport] = useState(null);

    useEffect(() => {
        // @ts-ignore
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/v0/issues/${id}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "X-User-UUID": uuid,
                    },
                });
                const data = await response.json();

                const [report] = mapReports([data]);
                setReport(report);
            } catch (error) {
                console.log("error", error);
            }
        };
        fetchData();
    }, []);

    return report;
};
