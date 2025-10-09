import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
console.log(category);
const dataSource = new ExternalServices();
const listElement = document.getElementById("listElement");
const productList = new ProductList(category, dataSource, listElement);

productList.init();