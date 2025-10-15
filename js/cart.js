import { getLocalStorage, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import { convertUsdToMxn } from './currency.js';

loadHeaderFooter();

let items = [];

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  //console.log(cartItems);


  if (cartItems.length >= 0) {
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.remove("hide");

    /**calculate cart total */
    const total = cartItems.reduce(
      (sumTotal, item) => {
        return sumTotal + Number(item.priceQty ?? item.price)
      }, 0);

    const sum = document.getElementById("sum");
    sum.textContent = `${total.toFixed(2)} USD`;
    let temporal = document.querySelectorAll(".plus");
    console.log(temporal);


    /*Currency Api convert total from dolar to mexican pesos */
    convertUsdToMxn(total).then(result => {
      if (result) {

        const totalmxn = document.getElementById("mxnTotal");
        totalmxn.textContent = `${result.pesos.toFixed(2)} MXN`;
        console.log(`Exchange rate USD → MXN: ${result.rate}`);
        console.log(`$${total} USD is approximately $${result.pesos.toFixed(2)} MXN`);
      }
    });


    /**plus quantity funcionality */
    document.querySelectorAll(".plus").forEach(plus => {
      plus.addEventListener("click", addToCart);


    });

    /*minus quantity funcionality */
    document.querySelectorAll(".minus").forEach(minus => {
      minus.addEventListener("click", removeToCart);

      /*Save for later button event */
      document.querySelectorAll(".save-for-later").forEach(btn => {
        btn.addEventListener("click", saveForLater);
      });

    });

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
  <div>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <span class="plus" data-id="${item.code}"></span> 
    <span class="minus" data-id="${item.code}"></span>   
     <button class="save-for-later" data-id="${item.code}">Save</button>
  </div>
  <p class="cart-card__price">$${item.price * item.quantity}</p>
</li>`;

  return newItem;
}

function addToCart(event) {
  const plus = event.currentTarget;
  let products = getLocalStorage("so-cart") || [];

  if (!products) {
    products = [];
  }


  const productInCart = products.find(product => product.code === plus.dataset.id);

  if (productInCart) {
    productInCart.quantity = productInCart.quantity + 1;
    productInCart.priceQty = productInCart.price * productInCart.quantity;
    setLocalStorage("so-cart", products);

  }

  renderCartContents();


}

function removeToCart(event) {
  const minus = event.currentTarget;
  let products = getLocalStorage("so-cart") || [];

  if (!products) {
    products = [];
  }

  const productInCart = products.find(product => product.code === minus.dataset.id);

  if (productInCart) {
    productInCart.quantity = productInCart.quantity - 1;
    productInCart.priceQty = productInCart.price * productInCart.quantity;


    /*remove the product if quantity is = 0
     */
    if (productInCart.quantity <= 0) {

      products = products.filter(product => product.code !== minus.dataset.id);

    }

    setLocalStorage("so-cart", products);
    renderCartContents();


  }
}

function saveForLater(event) {
  const code = event.currentTarget.dataset.id;

  let cart = getLocalStorage("so-cart") || [];
  let saved = getLocalStorage("saved-items") || [];

  const productIndex = cart.findIndex(item => item.code === code);
  if (productIndex > -1) {
    const [product] = cart.splice(productIndex, 1); // Remove from cart
    saved.push(product); // Add to saved
    setLocalStorage("so-cart", cart);
    setLocalStorage("saved-items", saved);
    renderCartContents();
    renderSavedItems();
  }
}

function renderSavedItems() {
  const savedItems = getLocalStorage("saved-items") || [];
  const htmlItems = savedItems.map(item => `
    <li>
      <p>🔹 ${item.name}</p>
      <button class="move-to-cart" data-id="${item.code}">Move to cart</button>
    </li>
  `).join("");

  document.querySelector(".saved-list").innerHTML = htmlItems;

  // Event to move back to cart
  document.querySelectorAll(".move-to-cart").forEach(btn => {
    btn.addEventListener("click", moveToCart);
  });
}

function moveToCart(event) {
  const code = event.currentTarget.dataset.id;

  let cart = getLocalStorage("so-cart") || [];
  let saved = getLocalStorage("saved-items") || [];

  const itemIndex = saved.findIndex(item => item.code === code);
  if (itemIndex > -1) {
    const [item] = saved.splice(itemIndex, 1);
    cart.push(item);
    setLocalStorage("so-cart", cart);
    setLocalStorage("saved-items", saved);
    renderCartContents();
    renderSavedItems();
  }
}



renderCartContents();
renderSavedItems();
