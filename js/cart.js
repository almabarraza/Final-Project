import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart");

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    //console.log(cartItems);

    if (cartItems.length > 0) {
        const cartFooter = document.querySelector(".cart-footer");
        cartFooter.classList.remove("hide");
        const total = cartItems.reduce(
            (sumTotal, item) => sumTotal + Number(item.FinalPrice),
            0,
        );
        const sum = document.getElementById("sum");
        sum.textContent = total;
    }
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.images.small}"
      alt="${item.name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.name}</h2>
  </a>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.price}</p>
</li>`;

    return newItem;
}

renderCartContents();
