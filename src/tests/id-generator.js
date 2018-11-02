export const generateId = () => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = 'id';

    for (let i = 20; i > 0; --i) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;

};
