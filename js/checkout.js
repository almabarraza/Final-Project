import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

//event when customer changes the zip code to recalculate the shipping and order total
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

//Submit button event prevent to execute the checkout code
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    order.checkout();
});
