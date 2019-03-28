import ComponentManager from "./component-manager";

const fs = window.remote.require('fs');

export default class DotStackerDirectory {
    constructor(homeDirectory) {
        console.log(homeDirectory);
        this.homeDirectory = homeDirectory;
    }

    saveRequisitions(requisitions) {
        this.createDir(this.homeDirectory + '.stacker');
        const openRequisitionsFolder = this.homeDirectory + '.stacker/openRequisitions';
        this.createDir(openRequisitionsFolder);
        (requisitions || []).forEach(requisition => {
            new ComponentManager().saveFile(openRequisitionsFolder + '/' + requisition.name, requisition)
        });
    }

    copyExamplesFile(asarDirectory) {
        this.createDir(this.homeDirectory + '.stacker');
        this.createDir(this.homeDirectory + '.stacker/plugins');
        if (this.createDir(this.homeDirectory + '.stacker/openRequisitions')) {
            fs.copyFileSync(asarDirectory + '.stacker/openRequisitions/examples.stk', this.homeDirectory + '.stacker/openRequisitions/examples.stk');
        }
    }


    createDir(directory) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            return true;
        }
        return false;
    }

}

