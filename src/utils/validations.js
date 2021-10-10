let required = (propertyType) => {
    return (v) => v.length > 0 || `You must input a ${propertyType}`;
};

let minLength = (propertyType, minLength) => {
    return (v) =>
        v.length >= minLength ||
        `${propertyType} must be at least ${minLength} characters`;
};

let maxLength = (propertyType, maxLength) => {
    return (v) =>
        v.length <= maxLength ||
        `${propertyType} must be less than ${maxLength} characters`;
};

let minQuantity = (propertyType, minQuantity) => {
    return (v) =>
        parseFloat(v) >= minQuantity ||
        `${propertyType} must be at least ${minQuantity}`;
};

let maxQuantity = (propertyType, maxQuantity) => {
    return (v) =>
        parseFloat(v) < maxQuantity ||
        `${propertyType} must be at least ${maxQuantity}`;
};

let emailFormat = () => {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
    return (v) => (v && regex.test(v)) || "Must be a valid email";
};
let numberFormat = () => {
    const regex = /^\d*(\.\d+)?$/;
    return (v) => (v && regex.test(v)) || "Must be a number";
};

export default {
    emailFormat,
    required,
    minLength,
    maxLength,
    minQuantity,
    maxQuantity,
    numberFormat,
};
