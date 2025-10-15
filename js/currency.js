export async function convertUsdToMxn(usdAmount) {

    const apiKey = 'cur_live_wsOaqLlPXQ3WFGNdrNlRLwrvqbOlaZJ2YK2w7rtI';
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

        const exchangeRate = 18.5; // USD to MXN
        const convertedAmount = usdAmount * exchangeRate; // Convertion dolars total amount to mexican pesos

        return {
            rate: exchangeRate,
            pesos: convertedAmount,
        };
    }
}