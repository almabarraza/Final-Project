import { renderListWithTemplate, setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
    let heartClass = "heart";
    if (product.like === true) {
        heartClass = "heart liked";
    }
    return `<li class="product-card">
    <a href="product_details.html?product=${product.code}">
    <picture>
        <source srcset="${product.images.large}" media="(min-width: 1024px)"/>
        <source srcset="${product.images.medium}" media="(min-width: 600px)"/>
        <img src="${product.images.small}" alt="${product.name}"/>
        <h3 class="card_brand">${product.name}</h3>    
    </picture> </a>       
    <span class="${heartClass}" data-id="${product.code}"></span>    
    <p class="product-card_price">$${product.price}</p>
    
    </li>`;


}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;

    }


    async init() {
        const list = await this.dataSource.getData(this.category);
        let favorites = [];
        favorites = getLocalStorage("favorites");
        list.forEach(product => {
            product.like = false;
            if (favorites) {
                favorites.forEach(p => {
                    if (product.code === p) {
                        product.like = true;
                    }
                });
            }
        });

        this.renderList(list);
        this.list = list;
        this.searchResult = list;
        document.querySelector(".title").textContent = this.category;
        const input = document.getElementById('search');
        const selectSort = document.getElementById('sortBy');

        //search product by name
        input.addEventListener('input', () => {
            const text = input.value.toLowerCase();
            this.searchResult = list.filter(p =>
                p.name.toLowerCase().includes(text)
            );
            this.renderList(this.searchResult);

        });

        //sort by name or by price
        selectSort.addEventListener('change', () => {
            const sortBy = selectSort.value;


            if (sortBy === 'name') {
                this.searchResult.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortBy === 'price') {
                this.searchResult.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-desc') {
                this.searchResult.sort((a, b) => b.price - a.price);
            }

            this.renderList(this.searchResult);
        });

    }

    //"afterbegin", "true"
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", "true");
        /*favorites heart event*/
        document.querySelectorAll(".heart").forEach(heart => {
            heart.addEventListener("click", this.toggleHeart.bind(this));


        });
    }

    toggleHeart(event) {
        const heart = event.currentTarget;
        heart.classList.toggle("liked");
        const productCode = heart.dataset.id;
        const likedProduct = this.list.find(p => p.code === productCode);
        likedProduct.like = !likedProduct.like;

        let favorites = getLocalStorage("favorites") || [];


        if (likedProduct.like === true) {
            favorites.push(productCode);

        } else {
            favorites = favorites.filter(item => item !== productCode);
            console.log(favorites);
        }

        setLocalStorage("favorites", favorites);

    }


}