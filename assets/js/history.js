import { fetchData } from "./fetchdata.js"

const baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices/'
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
const currentDay = String(today.getDate()).padStart(2, '0')
const area = 'DK2';
const apiUrl = `${baseUrl}${currentYear}/${currentMonth}-${currentDay}_${area}.json`


$('#datepicker').datepicker({
    uiLibrary: 'bootstrap'
});


async function historyData() {
        try {
        const data = await fetchData(apiUrl)
        if (data.length > 0) {
            const historyTable = document.getElementById('history-table')
            historyTable.innerHTML = ' '

            data.forEach(item => {
                let startTime = new Date(item.time_start).toLocaleTimeString('da-DK', {
                    hour: '2-digit',
                    minute: '2-digit'
                })
                console.log(startTime);


                let price = item.DKK_per_kWh.toFixed(3)
                const tableItem = document.createElement('div')
                tableItem.classList.add('history-table-item')
                tableItem.innerHTML = `<div class="history-bar"<p class="history-time"> kl ${startTime}</p> <p class="history-price"${price}kr </p></div>`

                historyTable.appendChild(tableItem)
            })
        } else {
            console.log('no data available for the chosen day');
        }
     } catch (error) {
        console.error('error handling historyData', error)
     }
}

historyData()


// // //bootstrap calender
// // $(document).ready(function() {
// //     $('#date-picker').datepicker().on('changeDate', function (event) {
// //         const chosenDate = event.format('mm/dd/yyy')
// //         $('#chosen-date').val(chosenDate)
// //     })
// //   })


  