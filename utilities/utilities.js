export function formatCurrency(priceCents) {
    return (Math.round(priceCents) / 100).toFixed(2);
}

export function isWeekend(date) {
    const formattedDate = date.format("dddd");
    if (formattedDate === "Sunday" || formattedDate === "Saturday") {
        return true;
    } else {
        return false;
    }
}
