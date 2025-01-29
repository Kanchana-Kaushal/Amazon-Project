export const cart = [
    {
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
    },

    {
        productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        quantity: 3,
    },
];

export function addToCart(productID) {
    let existingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productID === productID) {
            existingItem = cartItem;
        }
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productID: productID,
            quantity: 1,
        });
    }
}
