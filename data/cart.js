export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [
        {
            productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
        },

        {
            productID: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 3,
        },
    ];

    saveCartLocal();
}

function saveCartLocal() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

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

    saveCartLocal();
}

export function removeCartItems(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productID !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveCartLocal();
}

export function getCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
}
