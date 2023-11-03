import { fetchData } from "./fetchdata.js"

const baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices/'
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
const currentDay = String(today.getDate()).padStart(2, '0')
const area = 'DK2';
const apiUrl = `${baseUrl}${currentYear}/${currentMonth}-${currentDay}_${area}.json`

async function overviewData() {
    try {
        const data = await fetchData(apiUrl)

        if (data.length > 0) {
            // finds the highest and lowest prices for 'today'
            const highestPrice = Math.max(...data.map(item => item.DKK_per_kWh.toFixed(3)))    //using spreadoperator to seperate from new array
            const lowestPrice = Math.min(...data.map(item => item.DKK_per_kWh.toFixed(3)))

            const lowest = document.getElementById('lowestPrice')
            lowest.textContent = lowestPrice + ' pr. kwh'
            const highest = document.getElementById('highestPrice')
            highest.textContent = highestPrice + ' pr. kwh'

            // let tableHTML = '<ul>'
            for (const item of data) {
                let startTime = new Date(item.time_start).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })
                let price = item.DKK_per_kWh.toFixed(3)
                //console.log(`${startTime}: ${price}kr.`)

                // shows the hourly prices
                const overviewTable = document.querySelector('#overview-table')
                overviewTable.innerHTML += `<div class="overview-bar"<p class="overview-time">${startTime}</p> <p class="overview-price">${price}</p></div>`

                // tableHTML += `<li>${startTime} ${price} kr</li>`
                // tableHTML += '</ul>'

                // const overviewTable = document.querySelector('.overview-table')
                // overviewTable.innerHTML = tableHTML
                


            }
        } else {
            console.log('no data available for today');
        }
    } catch (error) {
        console.error('error handeling overviewData', error);
    }
}

overviewData()
