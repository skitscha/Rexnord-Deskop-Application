const ipcRenderer = require('electron').ipcRenderer;
function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    var formData=document.getElementById("ipcForm1").elements;
    var jsonData = {};
    var i;
    for(i=0;i<21;i++) {

        var name = formData[i].name;
        jsonData[name] = formData[i].value;
    }
     ipcRenderer.send('form-submission', jsonData)
}