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
            {
                label: 'New...',
                accelerator: 'CommandOrControl+N',
                submenu: [
                    {
                        label: 'Requisition',
                        // @ts-ignore
                        click: () => global.eventEmitter.emit('newRequisition'),
                    },
                    {
                        label: 'Publisher',
                        // @ts-ignore
                        click: () => global.eventEmitter.emit('newPublisher'),
                    },
                    {
                        label: 'Subscription',
                        // @ts-ignore
                        click: () => global.eventEmitter.emit('newSubscription'),
                    }
                ]
            },
            {
                label: 'Open',
                accelerator: 'CommandOrControl+O',
                // @ts-ignore
                click: () => global.eventEmitter.emit('openComponent'),
            },
            {type: 'separator'},
            {
                label: 'Import...',
                submenu: [
                    {
                        label: 'Postman collection',
                        // @ts-ignore
                        click: () => global.eventEmitter.emit('importPostmanCollection'),
                    },
                    {
                        label: 'Postman environment',
                        // @ts-ignore
                        click: () => global.eventEmitter.emit('importPostmanEnvironment'),
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
                label: 'Run current component',
                accelerator: 'CmdOrCtrl+Return',
                // @ts-ignore
                click: () => global.eventEmitter.emit('runCurrentlySelectedComponent'),
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
                    await shell.openExternal('https://enqueuer.com')
                }
            }
        ]
    }
];

// @ts-ignore
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
