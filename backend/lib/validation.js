/**
 * 빈문자열 검증
 * @param {*} str : 검사할 문자열
 * @returns 
 */
exports.isEmpty = (str) => {
    return typeof str == "undefined" || str == null || str == "" ? true : false
};


/**
 * 빈문자열 검증 후 빈문자열이면 기본 문자열로 반환
 * @param {*} str 검사할 문자열
 * @param {*} defaultStr 기본 문자열
 */
exports.nvl = (str, defaultStr) => {
    if (isEmpty(str)) {
        str = defaultStr;
    }

    return str;
};