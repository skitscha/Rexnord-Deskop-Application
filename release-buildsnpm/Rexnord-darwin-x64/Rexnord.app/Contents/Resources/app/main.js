// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow,Menu,ipcMain} = require('electron')
const menuTemplate=require('./menu/menu.js').template
const fs = require('fs')
const shell = require('shelljs')
const { dialog } = require('electron')
var mainWindow=null;
var editWindow=null;
var usbWindow=null;
var filepath=null;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600,icon: __dirname + '/Rexnord.ico'})
  mainWindow.loadFile('./index/index.html')
  mainWindow.on('closed', function () {
    mainWindow = null
  })
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu);
}
function createEditWindow () {
    editWindow = new BrowserWindow({width: 433, height: 300,icon: __dirname + '/Rexnord.ico'})
    editWindow.loadFile('./edit/edit.html')
    editWindow.on('closed', function () {
        editWindow = null
    })

}
function createUSBWindow () {
    usbWindow = new BrowserWindow({width: 800, height: 600,icon: __dirname + '/Rexnord.ico',backgroundColor: '#2e2c29'})
    usbWindow.loadFile('usb/usb.html')
    usbWindow.webContents.openDevTools()
    usbWindow.on('closed', function () {
        usbWindow = null
    })
}
ipcMain.on('new-edit-window', function(event, data) {
  createEditWindow();
});
ipcMain.on('file-path', function(event, data) {
    filepath=data;
});
ipcMain.on('form-submission', function(event, json) {
    console.log(filepath)
    shell
        .echo('Company:'+json.cName+'\n'+
            'Location:'+json.location+'\n'+
            'Chain Style:'+json.chainStyle+'\n'+
            'Chain Width:'+json.chainWidth+'\n'+
            'Chain Material:'+json.chainMaterial+'\n'+
            'Chain Length:'+json.chainLength+'\n'+
            'Product Information:'+json.productInformation+'\n'+
            'Diameter of drive sprocket:'+json.sprocketDiam+'\n'+
            'Number of teeth on Sprocket:'+json.sprocketNum+'\n'+
            'Product Weight:'+json.productWeight+'\n'+
            'Wearstrip Material:'+json.wearstripMaterial+'\n'+
            'Ambient/Chain temperature:'+json.chainTemp+'\n'+
            '% of time accumulation occurs (% slip):'+json.slip+'\n'+
            'Length of conveyor accumulation occurs:'+json.conveyorLength+'\n'+
            'Number of starts and stops per hour:'+json.numStarts+'\n'+
            'Lubrication:'+json.lubrication+'\n'+
            'Speed (FPM or MPM): :'+json.mSpeed+'\n'+
            'The product number of the bearing:'+json.bearingPNum+'\n'+
            'Environment:'+json.environment+'')
        .cat(filepath)
        .to(filepath)
});
ipcMain.on('createHashKey', function(event, path) {
    var milliseconds = Math.floor((new Date).getTime()/1000);
    var hash=((milliseconds*2)/3);
    var tuple="("+milliseconds+","+hash+")";
    if(!fs.existsSync(path+"Hash.key")) {
        fs.writeFile((path + "/Hash.key"), tuple, (err) => {
            if (err) {
                dialog.showErrorBox("Error","An error ocurred creating the file " + err.message)
            }
        })
        var files = fs.readdirSync(path)
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))

        mainWindow.webContents.send('read-dir',path,files);
    }

    else{
        dialog.showErrorBox("Error","There already is a hash key on the flashdrive")
    }
});
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
