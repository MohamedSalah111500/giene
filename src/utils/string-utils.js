export const truncate = (str, truncateLength) => {
    return str && (str.length > truncateLength) ? str.substring(0, truncateLength - 3) + "..." : str;
}