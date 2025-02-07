import { cart, addToCart, loadFromLocal } from "../../data/cart.js";

describe("Test Suit: Add to Cart", () => {
    it("Adds a new item to the cart", () => {
        spyOn(localStorage, "setItem");

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromLocal();

        addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(
            "83d4ca15-0f35-48f5-b7a3-1ea210004f2e"
        );
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].quantity).toEqual(1);
    });

    it("Adds an existing product to the cart", () => {
        spyOn(localStorage, "setItem");

        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: 1,
                },
            ]);
        });

        loadFromLocal();

        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual(
            "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
        );
    });
});
