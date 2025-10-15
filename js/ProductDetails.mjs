import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        console.log(this.dataSource);
        console.log(this.productId);
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product);
        this.renderProductDetails();

        document.getElementById('add-to-cart').addEventListener('click', this.addProductToCart.bind(this));

        //await this.renderProductDetails();

    }

    addProductToCart() {

        let products = getLocalStorage("so-cart") || [];

        if (!products) {
            products = [];
        }

        const productInCart = products.find(product => product.code === this.product.code);

        if (productInCart) {
            productInCart.quantity = productInCart.quantity + 1;

        } else {
            this.product.quantity = 1;
            products.push(this.product);
        }


        setLocalStorage("so-cart", products);

        //alert Message when the add to cart button has been clicking
        alertMessage(`${this.product.name} added to cart!`);

        //logo animation
        const cartLogo = document.getElementById("cart-logo");
        cartLogo.classList.add("logo-animated");

        cartLogo.addEventListener("animationend", function handler() {
            cartLogo.classList.remove("logo-animated");
            cartLogo.removeEventListener("animationend", handler);
        })

    }


    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('p-name').textContent = product.name;


    document.getElementById("imgLarge").srcset = product.images.large;
    document.getElementById("imgMedium").srcset = product.images.medium;
    document.getElementById("p-image").src = product.images.medium;
    document.getElementById("p-image").alt = product.name;
    document.getElementById('p-price').textContent = `$${product.price}`;
    document.getElementById('p-description').innerHTML = product.description;

    document.getElementById('add-to-cart').dataset.id = product.Id;

}
