export const generateId = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';

    for (let i = 10; i > 0; --i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'id' + new Date().getTime() + text;

};
