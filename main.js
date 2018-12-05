// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow,Menu,ipcMain} = require('electron')
const menuTemplate=require('./menu/menu.js').template
var mainWindow=null;
var editWindow=null;
var usbWindow=null;
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600,icon: __dirname + '/Rexnord.ico',backgroundColor: '#2e2c29'})
  mainWindow.loadFile('index.html')
   mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
    let menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu);
}
function createEditWindow () {
    usbWindow = new BrowserWindow({width: 433, height: 300,icon: __dirname + '/Rexnord.ico'})
    usbWindow.loadFile('edit.html')
    usbWindow.on('closed', function () {
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
  console.log(data);
  createEditWindow();
});
ipcMain.on('form-submission', function(event, data) {
  console.log(data);
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
