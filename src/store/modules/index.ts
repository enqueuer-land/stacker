/**
 * Automatically imports all the modules and exports as a single module object
 */

const modules: any = {};
const requireModule = require.context('.', false, /\.store\.ts$/);

requireModule.keys()
    .forEach(filename => {

        // create the module name from fileName
        // remove the store.js extension and capitalize
        const moduleName: string = filename
            .replace(/(\.\/|\.store\.ts)/g, '');

        modules[moduleName] = requireModule(filename).default || requireModule(filename);

        console.log('Store modules: ' + moduleName);
    });

export default modules;
