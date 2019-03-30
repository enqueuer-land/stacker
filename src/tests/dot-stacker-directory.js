import ComponentManager from "./component-manager";
import {generateId} from "./id-generator";

const fs = window.remote.require('fs');

export default class DotStackerDirectory {
    constructor(homeDirectory) {
        this.homeDirectory = homeDirectory;
        this.openRequisitionsFolder = this.homeDirectory + '.stacker/openRequisitions';
        this.createDir(this.homeDirectory + '.stacker');
        this.createDir(this.homeDirectory + '.stacker/plugins');
        this.createDir(this.openRequisitionsFolder);
    }

    saveRequisitions(requisitions) {
        fs.readdirSync(this.openRequisitionsFolder)
            .map(file => this.openRequisitionsFolder + '/' + file)
            .filter(file => fs.lstatSync(file).isFile())
            .forEach(file => fs.unlinkSync(file));

        (requisitions || []).forEach(requisition => {
            const name = this.openRequisitionsFolder + '/' + requisition.name + generateId(4);
            new ComponentManager().saveFile(name, requisition)
        });
    }

    copyExamplesFile(asarDirectory) {
        if (this.createDir(this.openRequisitionsFolder)) {
            fs.copyFileSync(asarDirectory + '.stacker/openRequisitions/examples', this.openRequisitionsFolder + '/examples');
        }
    }


    createDir(directory) {
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            return true;
        }
        return false;
    }

    openRequisitions() {
        return fs.readdirSync(this.openRequisitionsFolder)
            .map(file => this.openRequisitionsFolder + '/' + file)
            .filter(file => fs.lstatSync(file).isFile())
            .map(file => new ComponentManager().openRequisitionFile(file));
    }
}

