
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs')
var directory;
function openFile(path) {
    path=directory+"/"+path;
    ipcRenderer.send("new-edit-window",path);
}
function createButton(){
    if(!fs.existsSync(directory+"/Hash.key")) {
        var button = document.createElement("hashButton");
        button.innerHTML = "Create Hash Key";
        document.getElementById('display-files').append(button);
        button.addEventListener("click", function () {
            ipcRenderer.send("createHashKey", directory);
        });
    }
    else{
        console.log("Hash.key found");
    }
}
