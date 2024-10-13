import { categoryIdObj } from "../categories";
import { statusObj } from "../scenes";
import { unixToDate } from "./unixToDate";

export const mapReports = (reports) => {
    return reports
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(({ status, createdAt, categoryId, ...rest }) => ({
            category: categoryIdObj[categoryId],
            date: unixToDate(createdAt),
            status: statusObj[status],
            ...rest,
        }));
};
export const groupReports = (mappedReports) => {
    // @ts-ignore
    const groupedReports = Object.groupBy(mappedReports, ({ status }) => status);

    Object.values(statusObj).forEach((status) => {
        if (!groupedReports[status]) {
            groupedReports[status] = [];
        }
    });
    return groupedReports;
};
