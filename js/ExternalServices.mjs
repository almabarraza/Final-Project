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

export async function getTrendItems(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting data', error);
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
        const products = await fetch(baseURL);
        const data = await convertToJson(products);
        const result = data.find(r => r.code === id);
        console.log(result);
        return result;
    }

    async checkout(payload) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
        return await fetch(`${baseURL}`, options).then(convertToJson);
    }
}