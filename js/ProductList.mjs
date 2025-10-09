import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/?product=${product.code}">
    <picture>
        <source srcset="${product.images.large}" media="(min-width: 1024px)"/>
        <source srcset="${product.images.medium}" media="(min-width: 600px)"/>
        <img src="${product.images.small}" alt="${product.name}"/>
    </picture>        
     <h3 class="card_brand">${product.name}</h3>
    <p class="product-card_price">${product.price}</p>
    </a>
    </li>`;

}


export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }


    async init() {
        console.log("entra a product list");
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        document.querySelector(".title").textContent = this.category;


    }

    //"afterbegin", "true"
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }


}