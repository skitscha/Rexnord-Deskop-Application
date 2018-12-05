
const ipcRenderer = require('electron').ipcRenderer;
var directory;
function openFile(path) {
    path=directory+"/"+path;
    ipcRenderer.send("new-edit-window",path);
}

