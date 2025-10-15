export async function convertUsdToMxn(usdAmount) {
    const apiKey = 'cur_live_mL8W3VPpFbJtql5rVuR5VZM5QRXv4EQJm5d21TDC'; 
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=USD&currencies=MXN`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const exchangeRate = data.data.MXN.value; // USD to MXN
        const convertedAmount = usdAmount * exchangeRate; // Convertion dolars total amount to mexican pesos

        return {
            rate: exchangeRate,
            pesos: convertedAmount,
        };
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        return null;
    }
}