export async function fetchData(apiUrl) {
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data);
    return data
}




