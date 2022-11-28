const db = require('electron-db');
const { ipcMain, BrowserWindow } = require("electron");
const path = require('path')

const dir = '/home/USER/Documentos/ELECTRON/electron_toDo' //Use for custom dierectory

// This will save the database in the same directory as the application.
const location = path.join(__dirname, '')

module.exports.create_db = function () {
  db.createTable('items', location, (succ, msg) => {
    // succ - boolean, tells if the call is successful
    if (succ) {
      console.log(msg)
    } else {
      console.log('An error has occured. ' + msg)
    }
  })
}

ipcMain.on('save-item',(event, arg)=>{  
  event.sender.send("save-status",item_save(arg))
})

ipcMain.on('remove-item',(event,arg)=>{
  remove_item(arg);
})

ipcMain.on("get", (event,arg)=>{
  item_getAll()    
})

function item_save(obj) {    

  db.insertTableContent('items', dir ,obj, (succ, msg) => {    
    msj = {"Success" : succ, "Message" : msg}
    console.log("Success: " + succ);
    console.log("Message: " + msg);
  })  
  return msj;
}

function item_getAll(){  
  db.getAll('items', dir ,(succ, data) => {
    const win = BrowserWindow.getFocusedWindow();    
    if(succ){      
      win.webContents.send('data-items', data)      
    }      
  })
}

function remove_item(id){  
  db.deleteRow('items', dir, {'id': Number.parseInt(id)}, (succ, msg) => {
    const win = BrowserWindow.getFocusedWindow();
    if(succ){
      win.webContents.send('delete-result', msg)      
    }    
  });
}