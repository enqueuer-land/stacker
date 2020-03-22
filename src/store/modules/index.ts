const modules: any = {};
if (process.env.NODE_ENV !== 'test') {
    const requireModule = require.context('.', false, /\.store\.ts$/);
    const moduleNames: string[] = [];
    requireModule.keys()
        .forEach(filename => {
            const moduleName: string = filename.replace(/(\.\/|\.store\.ts)/g, '');

            modules[moduleName] = requireModule(filename).default();
            moduleNames.push(moduleName);
        });

    console.log('Store modules: ' + moduleNames.join('; '));
}
export default modules;
