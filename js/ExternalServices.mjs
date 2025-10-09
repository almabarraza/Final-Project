const baseURL = "data/products.json"

async function convertToJson(res) {
    const data = await res.json();
    console.log(data);
    if (res.ok) {
        return data;
    } else {
        throw { name: 'servicesError', message: data };
    }
}


export default class ExternalServices {
    constructor() {

    }
    async getData(category) {
        const response = await fetch(baseURL);
        const data = await convertToJson(response);
        const result = data.filter(item => item.category == category);
        console.log(result);
        console.log(category);
        return result;
    }
    async findProductById(id) {
        const products = await fetch(`${baseURL}product/${id}`);
        const data = await convertToJson(products);
        console.log(data.Result);
        return data.Result;
    }

    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
    }
}