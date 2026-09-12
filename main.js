const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  win.loadFile("index.html");
}

ipcMain.on("show-notification", (_event, payload) => {
  if (!Notification.isSupported()) return;
  const notification = new Notification({
    title: payload?.title || "TaskForge",
    body: payload?.body || "Tienes una tarea pendiente.",
    silent: true
  });
  notification.show();
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
