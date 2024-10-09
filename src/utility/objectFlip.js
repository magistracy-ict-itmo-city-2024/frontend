/**
 * Swaps object keys with values
 * @param {*} obj
 * @returns
 */
export const objectFlip = (obj) => {
    const ret = {};
    Object.keys(obj).forEach((key) => {
        ret[obj[key]] = key;
    });
    return ret;
};
