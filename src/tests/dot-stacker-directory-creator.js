const fs = window.remote.require('fs');

export default class DotStackerDirectoryCreator {
    constructor(asarDirectory, homeDirectory) {
        this.asarDirectory = asarDirectory;
        this.homeDirectory = homeDirectory;
    }

    create() {
        this.createDir(this.homeDirectory + '.stacker');
        this.createDir(this.homeDirectory + '.stacker/plugins');
        this.createDir(this.homeDirectory + '.stacker/plugins/protocols');
        this.createDir(this.homeDirectory + '.stacker/plugins/protocols/publishers');
        this.createDir(this.homeDirectory + '.stacker/plugins/protocols/subscriptions');
        fs.copyFileSync(this.asarDirectory + '.stacker/plugins/protocols/subscriptions/amqp.js', this.homeDirectory + '.stacker/plugins/protocols/subscriptions/amqp.js');
        fs.copyFileSync(this.asarDirectory + '.stacker/plugins/protocols/publishers/amqp.js', this.homeDirectory + '.stacker/plugins/protocols/publishers/amqp.js');

        fs.copyFileSync(this.asarDirectory + '.stacker/plugins/protocols/subscriptions/mqtt.js', this.homeDirectory + '.stacker/plugins/protocols/subscriptions/mqtt.js');
        fs.copyFileSync(this.asarDirectory + '.stacker/plugins/protocols/publishers/mqtt.js', this.homeDirectory + '.stacker/plugins/protocols/publishers/mqtt.js');

        if (this.createDir(this.homeDirectory + '.stacker/openRequisitions')) {
            fs.copyFileSync(this.asarDirectory + '.stacker/openRequisitions/examples.stk', this.homeDirectory + '.stacker/openRequisitions/examples.stk');
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
