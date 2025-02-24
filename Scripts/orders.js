export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveOrdersLocal(orders);
}

function saveOrdersLocal(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}
