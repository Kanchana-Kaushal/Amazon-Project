import { cart } from "../../data/cart-class.js";
import { findProduct } from "../../data/products.js";
import { formatCurrency } from "../../utilities/utilities.js";
import {
    deliveryOption,
    calculateDeliveryDate,
} from "../../data/delivery-option.js";
import { renderOrderSummery } from "./order-summery.js";

export function renderChekoutPage() {
    updateCheckoutCount();
    let cartSummeryHTML = "";

    cart.cartItems.forEach((cartItem) => {
        const matchingItem = findProduct(cartItem);
        let dateString;

        deliveryOption.forEach((deliveryOption) => {
            if (deliveryOption.id === cartItem.deliveryOptionId) {
                dateString = calculateDeliveryDate(deliveryOption);
            }
        });

        cartSummeryHTML += `<div class="cart-item-container js-cart-item-container-${
            matchingItem.id
        }">
                        <div class="delivery-date js-delivery-date-for-${
                            matchingItem.id
                        }">
                            Delivery date: ${dateString}
                        </div>

                        <div class="cart-item-details-grid">
                            <img
                                class="product-image"
                                src="${matchingItem.image}"
                            />

                            <div class="cart-item-details">
                                <div class="product-name">
                                    ${matchingItem.name}
                                </div>
                                <div class="product-price">${matchingItem.getPrice()}
                                </div>
                                <div class="product-quantity">
                                    <span>
                                        Quantity:
                                        <span class="quantity-label js-quantity-label-${
                                            matchingItem.id
                                        }">${cartItem.quantity}</span>
                                    </span>
                                    <span
                                        class="update-quantity-link link-primary js-update-quantity js-edit-quantity-${
                                            matchingItem.id
                                        } "
                                        data-product-id = "${matchingItem.id}"
                                    >
                                        Update
                                    </span>

                                    <input data-product-id = "${
                                        matchingItem.id
                                    }" class="quantity-input js-edit-quantity-${
                                        matchingItem.id
                                    } is-editing-quantity js-quantity-input-${
                                        matchingItem.id
                                    } js-quantity-input">
                                    <span class="save-quantity-link link-primary js-edit-quantity-${
                                        matchingItem.id
                                    } is-editing-quantity js-save-quantity-link" 
                                    data-product-id = "${
                                        matchingItem.id
                                    }">Save</span>

                                    <span
                                        class="delete-quantity-link link-primary js-delete-link"
                                        data-product-id = "${matchingItem.id}"
                                    >
                                        Delete
                                    </span>
                                </div>
                            </div>

                            <div class="delivery-options">
                                <div class="delivery-options-title">
                                    Choose a delivery option:
                                </div>
                                ${deliveryOptionHTML(matchingItem, cartItem)}
                            </div>
                        </div>
                    </div>`;
    });

    document.querySelector(".js-order-summery ").innerHTML = cartSummeryHTML;

    /*Delete Button*/
    document.querySelectorAll(".js-delete-link").forEach((elem) => {
        elem.addEventListener("click", () => {
            const elemProductId = elem.dataset.productId;
            cart.cartItems.forEach((cartItem) => {
                if (elemProductId === cartItem.productId) {
                    cart.removeCartItems(elemProductId);
                    const itemContainer = document.querySelector(
                        `.js-cart-item-container-${elemProductId}`
                    );
                    renderChekoutPage();
                    renderOrderSummery();
                }
            });
        });
    });

    /*Update Quantity Button */
    document.querySelectorAll(".js-update-quantity").forEach((elem) => {
        elem.addEventListener("click", () => {
            const productId = elem.dataset.productId;
            document
                .querySelectorAll(`.js-edit-quantity-${productId}`)
                .forEach((elem) => {
                    elem.classList.toggle("is-editing-quantity");
                });
        });
    });

    /*save quantity btn*/
    document.querySelectorAll(".js-save-quantity-link").forEach((elem) => {
        elem.addEventListener("click", () => {
            const productId = elem.dataset.productId;

            saveQuantity(productId);
        });
    });

    /*On key press event for save quantity */
    document.querySelectorAll(".js-quantity-input").forEach((elem) => {
        elem.addEventListener("keypress", (keyEvent) => {
            const productId = elem.dataset.productId;

            if (keyEvent.key === "Enter") {
                saveQuantity(productId);
            }
        });
    });

    /*update checkout count */
    function updateCheckoutCount() {
        document.querySelector(".js-checkout-count").innerText =
            `${cart.getCartQuantity()} items`;
    }

    /*Save Quantity Function*/
    function saveQuantity(productId) {
        let inputQuantity = Number(
            document.querySelector(`.js-quantity-input-${productId}`).value
        );

        if (!isNaN(inputQuantity)) {
            //Check if the number is NaN, if not proceed.
            if (inputQuantity > 0) {
                document
                    .querySelectorAll(`.js-edit-quantity-${productId}`)
                    .forEach((elem) => {
                        elem.classList.toggle("is-editing-quantity");
                    });

                cart.updateCartQuantity(productId, inputQuantity);

                document.querySelector(
                    `.js-quantity-label-${productId}`
                ).innerHTML = inputQuantity;

                renderChekoutPage();
                renderOrderSummery();
            }
        }
    }

    //This function will update delivery dates according to the current day and returns a string value of HTML.
    function deliveryOptionHTML(matchingItem, cartItem) {
        let HTML = "";
        deliveryOption.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);
            const priceCents =
                deliveryOption.priceCents === 0
                    ? "Free"
                    : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            HTML += `<div class="delivery-option js-delivery-option-input" 

                                        data-product-id =
                                         "${matchingItem.id}"

                                        data-delivery-option-id = 
                                        "${deliveryOption.id}" >

                                    <input
                                        ${isChecked ? "checked" : ""}
                                        type="radio"
                                        class="delivery-option-input"
                                        name="delivery-option-for-${
                                            matchingItem.id
                                        }"
                                    />
                                    <div>
                                        <div class="delivery-option-date">
                                            ${dateString}
                                        </div>
                                        <div class="delivery-option-price">
                                            ${priceCents} - Shipping
                                        </div>
                                    </div>
                                </div>`;
        });

        return HTML;
    }

    //Event Listener for Delivery options to update the option in the cart and the checkout page
    document.querySelectorAll(".js-delivery-option-input").forEach((elem) => {
        elem.addEventListener("click", () => {
            const deliveryOptionId = Number(elem.dataset.deliveryOptionId);
            const productId = elem.dataset.productId;

            cart.updateDeliveryOption(deliveryOptionId, productId);
            renderChekoutPage();
            renderOrderSummery();
        });
    });
}
