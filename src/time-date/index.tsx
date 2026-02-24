import moment from "moment";

export const getCurrentDateTime = (onlyDate = false) => {
    if (onlyDate === true) {
        return moment(new Date()).format("YYYY-MM-DD");
    }
    return moment(new Date()).format("YYYY-MM-DD H:m:s");
};