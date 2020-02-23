// If you target by class, enter item name directly
// If you target by class, add .
// If you target by id, add #

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'test one'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'

    const location = search.value

    fetch('https://3000-dot-3072219-dot-devshell.appspot.com/weather?search='+location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
    
})
})