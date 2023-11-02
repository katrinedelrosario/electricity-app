import { fetchData } from "./fetchdata.js"

const baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices/'

const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
const currentDay = String(today.getDate()).padStart(2,'0')
const area = 'DK2'

console.log(today);
const apiUrl = `${baseUrl}${currentYear}/${currentMonth}-${currentDay}_${area}.json`

async function findCurrentPrice() {
    try {
        let data = await fetchData(apiUrl)
        let currentTime = today
    
        //goes through each objects in fetched data array
        for (let i = 0; i < data.length; i++) {
            let startTime = new Date(data[i].time_start)
            let endTime = new Date(data[i].time_end)
    
            //compares our start- and endtime with current and returns data
            if (currentTime >= startTime && currentTime < endTime) {
                return data[i].DKK_per_kWh
            }
        }
    } catch (error) {
        console.error('error fetching current price', error);
    }
}

async function todayData() {
    try {
        let data = await fetchData(apiUrl)
        console.log(data)
    
        let currentPrice = await findCurrentPrice()
        console.log("Aktuel elpris i DKK per kWh: " + currentPrice)

    } catch (error) {
        console.error('error handeling todayData', error);
    }
}


todayData()



// const nowContent = document.getElementById('now-content');
// const dkkPerKwh = fetchData[0].DKK_per_kWh; // Dette antager, at du ønsker at hente værdien fra det første element i arrayet.
// nowContent.textContent = `Pris per kWh: ${dkkPerKwh} DKK`;




