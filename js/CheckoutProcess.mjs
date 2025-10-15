import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";




const services = new ExternalServices();

function formDataToJSON(formElement) {
    const formDAta = new FormData(formElement),
        convertedJSON = {};

    formDAta.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}


function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity,
        };
    });
    return simplifiedItems;
}


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        console.log(this.list);
        this.calculateItemSummary();
    }





    calculateItemSummary() {

        const summaryElement = document.querySelector(this.outputSelector + " #cartTotal");
        const itemNumElement = document.querySelector(this.outputSelector + " #num-items");
        itemNumElement.innerText = this.list.length;
        const amounts = this.list.map((item) => item.price * item.quantity);
        console.log(amounts);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        summaryElement.innerText = `$${this.itemTotal}`;
    }




    calculateOrderTotal() {
        console.log(this);
        this.tax = (this.itemTotal * 0.06);
        this.shipping = (this.list.length - 1) * 2 + 10;
        this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping))

        //display the totals.
        this.displayOrderTotals();
    }


    displayOrderTotals() {
        //once the totals are all calculated display them in the order sumary page
        const tax = document.querySelector(`${this.outputSelector} #tax`);
        const shipping = document.querySelector(`${this.outputSelector} #shipping`);
        const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

        tax.innerText = `$${this.tax.toFixed(2)}`;
        shipping.innerText = `$${this.shipping.toFixed(2)}`;
        orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
    }



    async checkout() {

        setLocalStorage("so-cart", []);
        location.assign("success.html");

    }



}

