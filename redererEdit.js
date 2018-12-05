const ipcRenderer = require('electron').ipcRenderer;
function sendForm(event) {
    console.log("inside onf sendForm");
    event.preventDefault() // stop the form from submitting
    let formData = new FormData(document.querySelector('ipcForm1'))
    ipcRenderer.send('form-submission', formData)
}