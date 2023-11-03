import { fetchData } from "./fetchdata.js"

const baseUrl = 'https://www.elprisenligenu.dk/api/v1/prices/'
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
const currentDay = String(today.getDate()).padStart(2, '0')
const area = 'DK2';
const apiUrl = `${baseUrl}${currentYear}/${currentMonth}-${currentDay}_${area}.json`

async function historyData() {
    try {
        const data = await fetchData(apiUrl)
        
    }
}