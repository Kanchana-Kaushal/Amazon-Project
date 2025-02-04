export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
    cart = [
        {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: 1,
        },

        {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 3,
            deliveryOptionId: 2,
        },
    ];

    saveCartLocal();
}

function saveCartLocal() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
    let existingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            existingItem = cartItem;
        }
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: 1,
        });
    }

    saveCartLocal();
}

export function removeCartItems(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
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

export function updateCartQuantity(productId, quantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = quantity;
            saveCartLocal();
        }
    });
}

export function updateDeliveryOption(newDeliveryOptionId, productId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryOptionId = newDeliveryOptionId;
    saveCartLocal();
}
