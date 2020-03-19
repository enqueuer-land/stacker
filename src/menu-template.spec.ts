import * as menuTemplate from '@/menu-template';

const sendMock = jest.fn();
const window: any = {webContents: {send: sendMock}};

describe('MenuTemplate', () => {
    beforeEach(() => {
        sendMock.mockClear();
    });

    it('should render file -> new -> requisition', () => {
        const menu = menuTemplate.default(window);
        const file = menu[1];
        const fileNew = file.submenu![0];
        // @ts-ignore
        const newRequisition = fileNew.submenu[0];
        newRequisition.click();

        expect(file).toEqual({
            label: 'File',
            submenu: expect.any(Array)
        });
        expect(fileNew).toEqual({
            label: 'New...',
            submenu: expect.any(Array)
        });
        // @ts-ignore
        expect(newRequisition).toEqual({
            accelerator: 'CommandOrControl+N',
            click: expect.any(Function),
            label: 'Requisition'
        });
        expect(sendMock).toHaveBeenCalledWith('newRequisition');
    });

    it('should render file -> new -> publisher', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const newPublisher = menu[1].submenu![0].submenu[1];
        newPublisher.click();

        // @ts-ignore
        expect(newPublisher).toEqual({
            accelerator: 'CommandOrControl+P',
            click: expect.any(Function),
            label: 'Publisher'
        });
        expect(sendMock).toHaveBeenCalledWith('newPublisher');
    });

    it('should render file -> new -> subscription', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const newSubscription = menu[1].submenu![0].submenu[2];
        newSubscription.click();

        // @ts-ignore
        expect(newSubscription).toEqual({
            accelerator: 'CommandOrControl+S',
            click: expect.any(Function),
            label: 'Subscription'
        });
        expect(sendMock).toHaveBeenCalledWith('newSubscription');
    });

    it('should render file -> open component', () => {
        const menu = menuTemplate.default(window);
        const openComponent = menu[1].submenu![1];
        // @ts-ignore
        openComponent.click();

        expect(openComponent).toEqual({
            accelerator: 'CommandOrControl+O',
            click: expect.any(Function),
            label: 'Open component'
        });
        expect(sendMock).toHaveBeenCalledWith('openComponent');
    });

    it('should render file -> open environment', () => {
        const menu = menuTemplate.default(window);
        const openEnvironment = menu[1].submenu![2];
        // @ts-ignore
        openEnvironment.click();

        expect(openEnvironment).toEqual({
            click: expect.any(Function),
            label: 'Open environment'
        });
        expect(sendMock).toHaveBeenCalledWith('openEnvironment');
    });

    it('should render file -> load plugin', () => {
        const menu = menuTemplate.default(window);
        const loadPlugin = menu[1].submenu![3];
        // @ts-ignore
        loadPlugin.click();

        expect(loadPlugin).toEqual({
            click: expect.any(Function),
            label: 'Load plugin'
        });
        expect(sendMock).toHaveBeenCalledWith('loadPlugin');
    });

    it('should render file -> import -> postman -> collection', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const postmanCollection = menu[1].submenu![5].submenu![0].submenu![0];
        postmanCollection.click();

        // @ts-ignore
        expect(postmanCollection).toEqual({
            click: expect.any(Function),
            label: 'Collection'
        });
        expect(sendMock).toHaveBeenCalledWith('importPostmanCollection');
    });

    it('should render file -> import -> postman -> environment', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const postmanEnvironment = menu[1].submenu![5].submenu![0].submenu![1];
        postmanEnvironment.click();

        // @ts-ignore
        expect(postmanEnvironment).toEqual({
            click: expect.any(Function),
            label: 'Environment'
        });
        expect(sendMock).toHaveBeenCalledWith('importPostmanEnvironment');
    });

    it('should render editMenu', () => {
        const menu = menuTemplate.default(window);
        const editMenu = menu[2];

        // @ts-ignore
        expect(editMenu).toEqual({
            role: 'editMenu',
        });
    });

    it('should render viewMenu', () => {
        const menu = menuTemplate.default(window);
        const viewMenu = menu[3];

        // @ts-ignore
        expect(viewMenu).toEqual({
            role: 'viewMenu',
        });
    });

    it('should render run -> Run component', () => {
        const menu = menuTemplate.default(window);
        const runComponent = menu[4].submenu![0];
        // @ts-ignore
        runComponent.click();

        // @ts-ignore
        expect(runComponent).toEqual({
            accelerator: 'CmdOrCtrl+Return',
            click: expect.any(Function),
            label: 'Run component'
        });
        expect(sendMock).toHaveBeenCalledWith('runCurrentlySelectedComponent');
    });

    it('should render run -> Run highest parent component', () => {
        const menu = menuTemplate.default(window);
        const runHighestComponent = menu[4].submenu![1];
        // @ts-ignore
        runHighestComponent.click();

        // @ts-ignore
        expect(runHighestComponent).toEqual({
            accelerator: 'CmdOrCtrl+Shift+Return',
            click: expect.any(Function),
            label: 'Run highest parent'
        });
        expect(sendMock).toHaveBeenCalledWith('runHighestParentOfSelectedComponent');
    });

    it('should render windowMenu', () => {
        const menu = menuTemplate.default(window);
        const windowMenu = menu[5];

        // @ts-ignore
        expect(windowMenu).toEqual({
            role: 'windowMenu',
        });
    });

    it('should render help', () => {
        const menu = menuTemplate.default(window);
        const help = menu[6];

        // @ts-ignore
        expect(help).toEqual({
            role: 'help',
            submenu: expect.any(Array)
        });
    });

    it('should render help -> stacker', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const stacker = menu[6].submenu[0];
        // @ts-ignore
        stacker.click();

        // @ts-ignore
        expect(stacker).toEqual({
            label: 'Learn more about stacker',
            click: expect.any(Function)
        });
    });

    it('should render help -> enqueuer', () => {
        const menu = menuTemplate.default(window);
        // @ts-ignore
        const enqueuer = menu[6].submenu[1];
        // @ts-ignore
        enqueuer.click();

        // @ts-ignore
        expect(enqueuer).toEqual({
            label: 'Learn more about enqueuer',
            click: expect.any(Function)
        });
    });

});
