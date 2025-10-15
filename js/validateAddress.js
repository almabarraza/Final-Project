const EMBEDDED_KEY = '249974999062852132';

export async function validateAddress(street, city, state) {
    const url = `https://us-street.api.smarty.com/street-address?` +
        `key=${EMBEDDED_KEY}` +
        `&street=${encodeURIComponent(street)}` +
        `&city=${encodeURIComponent(city)}` +
        `&state=${encodeURIComponent(state)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Smarty API error:", error);
        return null;
    }
}