import {shell} from 'electron'

const isMac = process.platform === 'darwin';

export default (window: Electron.BrowserWindow) => [
    {role: 'appMenu'},
    // ...(isMac ? [{
    //     label: 'Stacker',
    //     submenu: [
    //         {role: 'about'},
    //         {type: 'separator'},
    //         {role: 'services'},
    //         {type: 'separator'},
    //         {role: 'hide'},
    //         {role: 'hideothers'},
    //         {role: 'unhide'},
    //         {type: 'separator'},
    //         {role: 'quit'}
    //     ]
    // }] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'New...',
                submenu: [
                    {
                        label: 'Requisition',
                        accelerator: 'CommandOrControl+N',
                        click: () => window.webContents.send('newRequisition'),
                    },
                    {
                        label: 'Publisher',
                        accelerator: 'CommandOrControl+P',
                        click: () => window.webContents.send('newPublisher'),
                    },
                    {
                        label: 'Subscription',
                        accelerator: 'CommandOrControl+U',
                        click: () => window.webContents.send('newSubscription'),
                    }
                ]
            },
            {
                label: 'Save',
                accelerator: 'CommandOrControl+S',
                click: () => window.webContents.send('saveCurrentlySelectedComponent'),
            },
            {
                label: 'Save as',
                accelerator: 'CommandOrControl+Shift+S',
                click: () => window.webContents.send('saveCurrentlySelectedComponentAs'),
            },
            {
                label: 'Open',
                accelerator: 'CommandOrControl+O',
                click: () => window.webContents.send('openComponent'),
            },
            {
                label: 'Open environment',
                accelerator: 'CommandOrControl+Shift+O',
                click: () => window.webContents.send('openEnvironment'),
            },
            {type: 'separator'},
            {
                label: 'Import from...',
                submenu: [
                    {
                        label: 'Postman...',
                        submenu: [
                            {
                                label: 'Collection',
                                click: () => window.webContents.send('importPostmanCollection'),
                            },
                            {
                                label: 'Environment',
                                click: () => window.webContents.send('importPostmanEnvironment'),
                            }
                        ]
                    }
                ]
            },
            // {type: 'separator'},
            // {label: 'Save All'},
            {type: 'separator'},
            // {role: 'quit'},
            isMac ? {role: 'close'} : {role: 'quit'}
        ]
    },
    {role: 'editMenu'},
    {role: 'viewMenu'},
    {
        label: 'Run',
        submenu: [
            {
                label: 'Run component',
                accelerator: 'CmdOrCtrl+Return',
                click: () => window.webContents.send('runCurrentlySelectedComponent'),
            },
            {
                label: 'Run highest parent',
                accelerator: 'CmdOrCtrl+Shift+Return',
                click: () => window.webContents.send('runHighestParentOfSelectedComponent'),
            },
        ]
    },
    {role: 'windowMenu'},
    {
        label: 'Plugins',
        submenu: [{
            label: 'Load from file',
            click: () => window.webContents.send('loadPlugin')
        }]
    },
    {
        label: 'Logs',
        //TODO add log options
        submenu: []
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn more about stacker',
                click: async () => {
                    await shell.openExternal('https://enqueuer-land.github.io/stacker')
                }
            },
            {
                label: 'Learn more about enqueuer',
                click: async () => {
                    await shell.openExternal('https://enqueuer.com/docs')
                }
            }
        ]
    }
];
