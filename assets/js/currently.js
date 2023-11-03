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
        const data = await fetchData(apiUrl)
        const currentTime = today
    
        //goes through each objects in fetched data array
        for (let i = 0; i < data.length; i++) {
            const startTime = new Date(data[i].time_start)
            const endTime = new Date(data[i].time_end)
    
            //compares our start- and endtime with current and returns data
            if (currentTime >= startTime && currentTime < endTime) {
                return data[i].DKK_per_kWh.toFixed(3)  //formats with 3 decimals
            }
        }
    } catch (error) {
        console.error('error fetching current price', error);
    }
}

async function currentlyData() {
    try {
        let data = await fetchData(apiUrl)
        //console.log(data)
    
        let currentPrice = await findCurrentPrice()
        //console.log('current price:' + currentPrice)

        const currentlyPrice = document.getElementById('currently-price')
        currentlyPrice.textContent = currentPrice + ' pr. kwh '

        const currentlyTime = document.getElementById('currently-time')
        const currentStartHour = new Date().getHours().toFixed(2)
        const currentEndHour = (new Date().getHours() +1).toFixed(2)
        currentlyTime.textContent = currentStartHour + ' - ' + currentEndHour
        //console.log('current hours:', currentStartHour, currentEndHour);

    } catch (error) {
        console.error('error handeling currentlyData', error);
    }
}


currentlyData()





