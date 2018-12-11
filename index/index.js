
const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs')
const $ = require('jQuery');
var directory;
function openFile(path) {
    path=directory+"/"+path;
    ipcRenderer.send("new-edit-window");
    ipcRenderer.send("file-pat",path);
}
function createButton(){
    if(!fs.existsSync(directory+"/Hash.key")) {
        var button = document.createElement("button");
        button.className = "hash-button";
        button.innerHTML = "Create Hash Key";
        document.getElementById('hashButtonDiv').append(button);
        button.addEventListener("click", function () {
            ipcRenderer.send("createHashKey", directory);
            button.parentNode.removeChild(button);
        });
    }
    else{
        console.log("Hash.key found");
    }
}

ipcRenderer.on('read-dir', (event,dir, files) => {
    var listHTML = ''
    files.forEach(f => {
        directory = dir;
        const extension = f.split('.')[1];
        if(extension=='csv') {
            listHTML +=
                '<div class="file" id="' + f + '" ondblclick="openFile(this.id)">' +
                '<img src="file-' + extension + '.png" alt="" class="file-image">' +
                '<h2 class="file-name">' + f + '</h2>' +
                '</div>'
        }
        else if(extension=='key'){
            listHTML +=
                '<div class="file" id="' + f + '">' +
                '<img src="file-' + extension + '.png" alt="" class="file-image">' +
                '<h2 class="file-name">' + f + '</h2>' +
                '</div>'
        }
    })
    $('#display-files').html(listHTML)
    createButton();
})