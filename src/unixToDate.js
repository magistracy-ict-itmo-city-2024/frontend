export const unixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    const dateString = date.toLocaleDateString("ru-RU");
    return dateString;
};
