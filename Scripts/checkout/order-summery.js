import { cart } from "../../data/cart-class.js";
import { findDeliveryOption } from "../../data/delivery-option.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../../utilities/utilities.js";
import { addOrder } from "../orders.js";

export function renderOrderSummery() {
    let cartTotalPriceCents = 0;
    let totalShippingPriceCents = 0;

    cart.cartItems.forEach((cartItem) => {
        const matchingItem = findProduct(cartItem);
        cartTotalPriceCents += cartItem.quantity * matchingItem.priceCents;

        const deliveryOption = findDeliveryOption(cartItem);
        totalShippingPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTax = cartTotalPriceCents + totalShippingPriceCents;
    const estTax = totalBeforeTax * 0.1;
    const subTotal = totalBeforeTax + estTax;

    document.querySelector(".js-payment-summery").innerHTML =
        `<div class="payment-summary-title">Order Summary</div>

                    <div class="payment-summary-row">
                        <div>Items (${cart.getCartQuantity() || 0}):</div>
                        <div class="payment-summary-money">$${formatCurrency(
                            cartTotalPriceCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div class="payment-summary-money">$${formatCurrency(
                            totalShippingPriceCents
                        )}</div>
                    </div>

                    <div class="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div class="payment-summary-money">$${formatCurrency(
                            totalBeforeTax
                        )}</div>
                    </div>

                    <div class="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div class="payment-summary-money">$${formatCurrency(
                            estTax
                        )}</div>
                    </div>

                    <div class="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div class="payment-summary-money">$${formatCurrency(
                            subTotal
                        )}</div>
                    </div>

                    <button class="place-order-button button-primary js-place-order-button">
                        Place your order
                    </button>`;

    document
        .querySelector(".js-place-order-button")
        .addEventListener("click", async () => {
            try {
                const response = await fetch(
                    "https://supersimplebackend.dev/orders",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            cart: cart,
                        }),
                    }
                );

                const order = await response.json();
                addOrder(order);
                console.log(order);
            } catch (error) {
                console.log("Unexpected error. Try again later.");
            }

            window.location.href = "orders.html";
        });
}
