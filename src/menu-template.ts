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
            // {
            //     label: 'New...',
            //     accelerator: 'CommandOrControl+N',
            //     submenu: [
            //         {
            //             label: 'Requisition',
            //             // @ts-ignore
            //             click: () => global.eventEmitter.emit('newRequisition'),
            //         },
            //         {
            //             label: 'Publisher',
            //             // @ts-ignore
            //             click: () => global.eventEmitter.emit('newPublisher'),
            //         },
            //         {
            //             label: 'Subscription',
            //             // @ts-ignore
            //             click: () => global.eventEmitter.emit('newSubscription'),
            //         }
            //     ]
            // },
            {
                label: 'Open component',
                accelerator: 'CommandOrControl+O',
                click: () => window.webContents.send('openComponent'),
            },
            {
                label: 'Open environment',
                click: () => window.webContents.send('openEnvironment'),
            },
            {
                label: 'Load plugin',
                // @ts-ignore
                click: () => window.webContents.send('loadPlugin'),
            },
            {type: 'separator'},
            {
                label: 'Import from',
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
            {role: 'quit'},
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
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async () => {
                    await shell.openExternal('https://enqueuer.com/docs')
                }
            }
        ]
    }
];
