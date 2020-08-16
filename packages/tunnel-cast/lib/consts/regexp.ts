export const patterns = {

    email:  /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,5})$/,
    url: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    strongPasswordComplex: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/,
    strongPasswordModerate: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
    alphaNumeric: /^[a-zA-Z0-9]*$/,
    numeric: /^[0-9]*$/,
    alpha: /^[a-zA-Z]*$/,
    integer: /^-?\d+$/,
    positiveInteger: /^\d+$/,
    negativeInteger: /^-\d+$/,
}