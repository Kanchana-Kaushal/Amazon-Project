import { loadProductsFetch } from "../data/products.js";
import { renderChekoutPage } from "./checkout/checkout-summery.js";
import { renderOrderSummery } from "./checkout/order-summery.js";

/* async function loadPage() {
    await loadProductsFetch();

    renderChekoutPage();
    renderOrderSummery();
}

loadPage(); */

loadProductsFetch().then(() => {
    renderChekoutPage();
    renderOrderSummery();

    /*     document
        .querySelector(".js-place-order-button")
        .addEventListener("click", async () => {
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
            console.log(order);
        }); */
});
