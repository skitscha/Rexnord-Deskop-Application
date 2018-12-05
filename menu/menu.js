const { dialog } = require('electron')
const { app } = require('electron').app
const fs = require('fs')
const drivelist = require('drivelist');
var usbList=[];
module.exports = {
    template: [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open USB',
                    accelerator: 'CmdOrCtrl+O',
                    click (menuItem, browserWindow, event) {
                        drivelist.list((error, drives) => {
                            if (error) {
                                throw error;
                            }

                            drives.forEach((drive) => {
                                if(drive.isUSB)
                                usbList.push(drive);
                            });
                            if(usbList.length>0) {
                                if (fs.statSync(usbList[0].mountpoints[0].path).isDirectory()) {
                                    var files = fs.readdirSync(usbList[0].mountpoints[0].path)
                                    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
                                    if (browserWindow != null) {
                                        browserWindow.webContents.send('read-dir', usbList[0].mountpoints[0].path, files)
                                    }
                                }
                            }
                            else{
                                dialog.showErrorBox("Error","No USBs detected on the computer")
                            }


                        });

                        // dialog.showOpenDialog({
                        //     properties: ['openDirectory']
                        // }, ([dir]) => {
                        //     try {
                        //         if (fs.statSync(dir).isDirectory()) {
                        //             const files = fs.readdirSync(dir)
                        //             if(browserWindow!=null) {
                        //                 browserWindow.webContents.send('read-dir',dir, files)
                        //             }
                        //         }
                        //     } catch (err) {
                        //         console.error(err)
                        //     }
                        // })

                    }

                },
                {
                    label: 'Exit',
                    accelerator: 'CmdOrCtrl+Q',
                    role: 'close',
                    click(){
                        if (process.platform !== 'darwin') {
                            app.quit()
                        }
                        else{

                        }
                    }
                }
            ]

        },
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'}
            ]
        },
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forcereload'},
                {role: 'toggledevtools'},
                {type: 'separator'},
                {role: 'resetzoom'},
                {role: 'zoomin'},
                {role: 'zoomout'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        {
            role: 'window',
            submenu: [
                {role: 'minimize'},
                {role: 'close'}
            ]
        },
    ]
}