export function getStatus(value: string) {
    if (value === 'ACTIVE') {
        return "Active"
    } else if (value === 'INACTIVE') {
        return 'In Active'
    }
}

export function roundAfterDecimal(val: string | number) {
    const num = Number(val);

    if (Number.isNaN(num)) return 0;

    const integerPart = Math.floor(num);
    const decimalPart = num - integerPart;

    return decimalPart >= 0.5 ? integerPart + 1 : integerPart;
};

export default {
    getStatus,
    roundAfterDecimal
}