export const generateId = (length = 10) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';

    for (let i = length; i > 0; --i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return 'id' + new Date().getTime() + text;

};
