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

    // (Opcional) actualizar el formulario con dirección corregida
    document.querySelector("#street").value = result.delivery_line_1;
    const [cityFixed, stateZip] = result.last_line.split(",");
    const [stateFixed, zip] = stateZip.trim().split(" ");
    document.querySelector("#city").value = cityFixed.trim();
    document.querySelector("#state").value = stateFixed;
    document.querySelector("#zip").value = zip;


    order.checkout();
});
