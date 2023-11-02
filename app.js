const black = '#201e1e'
const grey = '#27282b'
const white = '#ebebeb'
const green = '#55ec20'


const summaryLink = document.getElementById('summary')
const nowLink = document.getElementById('now')
const historyLink = document.getElementById('history')

const summaryContent = document.getElementById('summary-content')
const nowContent = document.getElementById('now-content')
const historyContent = document.getElementById('history-content')


summaryContent.style.display = 'block'
nowContent.style.display = 'none'
historyContent.style.display = 'none'

summaryLink.addEventListener('click', () => {

    //displays content depending on which 'active'
    summaryContent.style.display = 'block'
    nowContent.style.display = 'none'
    historyContent.style.display = 'none'

    //shows active color
    summaryLink.style.color = white
    nowLink.style.color = white
    historyLink.style.color = white
    
    summaryLink.style.color = green
})

nowLink.addEventListener('click', () => {
    summaryContent.style.display = 'none'
    nowContent.style.display = 'block'
    historyContent.style.display = 'none'

    summaryLink.style.color = white
    nowLink.style.color = white
    historyLink.style.color = white
    
    nowLink.style.color = green
})

historyLink.addEventListener('click', () => {
    summaryContent.style.display = 'none'
    nowContent.style.display = 'none'
    historyContent.style.display = 'block'
    
    summaryLink.style.color = white
    nowLink.style.color = white
    historyLink.style.color = white

    historyLink.style.color = green
})

