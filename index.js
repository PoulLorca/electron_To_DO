const {app, BrowserWindow} = require('electron');
const mydb  = require('./database');

function createWindow(){
    let win = new BrowserWindow({
        height:600,
        width:1000,        
        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false
        }
    })

    win.loadFile('./index.html')    
    win.webContents.openDevTools();
}

app.whenReady().then(()=>{
    createWindow();
})

//mydb.create_db();    Just One Time