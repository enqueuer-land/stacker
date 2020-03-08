import {Menu, shell} from 'electron'

const isMac = process.platform === 'darwin';

const template = [
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
                label: 'Open requisition',
                accelerator: 'CommandOrControl+O',
                // @ts-ignore
                click: () => global.eventEmitter.emit('openComponent'),
            },
            {
                label: 'Open environment',
                // @ts-ignore
                click: () => global.eventEmitter.emit('openEnvironment'),
            },
            {
                label: 'Load plugin',
                // @ts-ignore
                click: () => global.eventEmitter.emit('loadPlugin'),
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
                                // @ts-ignore
                                click: () => global.eventEmitter.emit('importPostmanCollection'),
                            },
                            {
                                label: 'Environment',
                                // @ts-ignore
                                click: () => global.eventEmitter.emit('importPostmanEnvironment'),
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
                // @ts-ignore
                click: () => global.eventEmitter.emit('runCurrentlySelectedComponent'),
            },
            {
                label: 'Run highest parent',
                accelerator: 'CmdOrCtrl+Shift+Return',
                // @ts-ignore
                click: () => global.eventEmitter.emit('runHighestParentOfSelectedComponent'),
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

// @ts-ignore
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
