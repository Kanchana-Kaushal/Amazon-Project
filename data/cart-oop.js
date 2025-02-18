function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,

        loadFromLocal() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

            if (!this.cartItems) {
                this.cartItems = [
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

                this.saveCartLocal();
            }
        },

        saveCartLocal() {
            localStorage.setItem(
                (localStorageKey = JSON.stringify(this.cartItems))
            );
        },

        addToCart(productId) {
            let existingItem;
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    existingItem = cartItem;
                }
            });

            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: 1,
                });
            }

            this.saveCartLocal();
        },

        removeCartItems(productId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });

            this.cartItems = newCart;

            this.saveCartLocal();
        },

        getCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });

            return cartQuantity;
        },

        updateCartQuantity(productId, quantity) {
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    cartItem.quantity = quantity;
                    this.saveCartLocal();
                }
            });
        },

        updateDeliveryOption(newDeliveryOptionId, productId) {
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingItem = cartItem;
                }
            });

            matchingItem.deliveryOptionId = newDeliveryOptionId;
            this.saveCartLocal();
        },
    };

    return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("businessCart-oop");
cart.loadFromLocal();
businessCart.loadFromLocal();

console.log(cart);
console.log(businessCart);

businessCart.addToCart("3fdfe8d6-9a15-4979-b459-585b0d0545b9");
