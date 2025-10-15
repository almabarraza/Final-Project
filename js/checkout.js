import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { validateAddress } from "./validateAddress.js";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

//event when customer changes the zip code to recalculate the shipping and order total
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

//Submit button event prevent to execute the checkout code
document.querySelector("#checkoutSubmit").addEventListener("click", async (e) => {
    e.preventDefault();


    const street = document.querySelector("#street").value;
    const city = document.querySelector("#city").value;
    const state = document.querySelector("#state").value;

    const result = await validateAddress(street, city, state);

    if (!result) {
        alert("❌ Invalid address. Please check and try again.");
        return;
    }


    order.checkout();
});
