import 'reflect-metadata'

import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell } from 'electron'
import fs from 'fs'
import { clearMainBindings, mainBindings } from 'i18next-electron-fs-backend'
import { join } from 'path'

import { createLog } from '@shared/utils/createLog'

import icon from '../../resources/icon.png?asset'

import { AppDataSource } from './database/AppDataSource'

import 'dotenv/config'
import '@main/domains/Config/api/ConfigIpcHandlers'
import '@main/domains/Common/api/CommonIpcHandlers'
import '@main/domains/Sources/api/SourcesIpcHandlers'
import '@main/domains/Config/mappers/ConfigMapper'
import '@main/domains/Sources/mappers/SourcesMapper'

const log = createLog({ category: 'MAIN' })

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainBindings(ipcMain, mainWindow, fs) // configures the localization backend

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  try {
    await AppDataSource.initialize()
    log.success('Database connected at', AppDataSource.options.database)

    await createWindow()
  } catch (err) {
    log.error('Failed to initialize database:', err)
    app.quit()
  }

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  clearMainBindings(ipcMain)

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
