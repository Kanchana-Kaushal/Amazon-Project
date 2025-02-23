import { loadProducts } from "../data/products.js";
import { renderChekoutPage } from "./checkout/checkout-summery.js";
import { renderOrderSummery } from "./checkout/order-summery.js";

loadProducts(() => {
    renderChekoutPage();
    renderOrderSummery();
});
