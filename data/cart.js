export const cart = [];

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
