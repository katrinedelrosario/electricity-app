import { fetchData } from "./fetchdata.js";

const baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices/';
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
const currentDay = String(today.getDate()).padStart(2, '0');
const area = 'DK2';
const apiUrl = `${baseUrl}${currentYear}/${currentMonth}-${currentDay}_${area}.json`;

async function overviewData() {
    try {
        const data = await fetchData(apiUrl);

        if (data.length > 0) {
            // finds the highest and lowest prices for 'today'
            const highestPrice = Math.max(...data.map(item => item.DKK_per_kWh))    //using spreadoperator to seperate from new array
            const lowestPrice = Math.min(...data.map(item => item.DKK_per_kWh))

            console.log('Højeste pris: ' + highestPrice.toFixed(3) + ' DKK per kWh')
            console.log('Laveste pris: ' + lowestPrice.toFixed(3) + ' DKK per kWh')

            // shows the hourly prices
            console.log('Prisoversigt pr. time:')
            for (const item of data) {
                const startTime = new Date(item.time_start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
                console.log(`${startTime}: ${item.DKK_per_kWh.toFixed(3)}kr.`)
            }
        } else {
            console.log('Ingen data tilgængelig for dagen.');
        }
    } catch (error) {
        console.error('Fejl ved behandling af overviewData', error);
    }
}

overviewData();
