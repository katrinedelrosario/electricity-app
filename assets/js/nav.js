const black = '#201e1e'
const grey = '#27282b'
const white = '#ebebeb'
const green = '#55ec20'


const overviewLink = document.getElementById('overview')
const currentlyLink = document.getElementById('currently')
const historyLink = document.getElementById('history')

const overviewContent = document.getElementById('overview-content')
const currentlyContent = document.getElementById('currently-content')
const historyContent = document.getElementById('history-content')


overviewContent.style.display = 'none'
currentlyContent.style.display = 'block'
historyContent.style.display = 'none'

overviewLink.addEventListener('click', () => {

    //displays content depending on which 'active'
    overviewContent.style.display = 'block'
    currentlyContent.style.display = 'none'
    historyContent.style.display = 'none'

    //shows active color
    overviewLink.style.color = white
    currentlyLink.style.color = white
    historyLink.style.color = white
    
    overviewLink.style.color = green
})

currentlyLink.addEventListener('click', () => {
    overviewContent.style.display = 'none'
    currentlyContent.style.display = 'block'
    historyContent.style.display = 'none'

    overviewLink.style.color = white
    currentlyLink.style.color = white
    historyLink.style.color = white
    
    currentlyLink.style.color = green
})

historyLink.addEventListener('click', () => {
    
    overviewContent.style.display = 'none'
    currentlyContent.style.display = 'none'
    historyContent.style.display = 'block'
    
    overviewLink.style.color = white
    currentlyLink.style.color = white
    historyLink.style.color = white

    historyLink.style.color = green
})

