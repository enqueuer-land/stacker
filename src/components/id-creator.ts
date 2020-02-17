//TODO test it
export class IdCreator {

    private possible: string;

    public constructor(possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        this.possible = possible;
    }

    public create = (length = 20): string => {
        let text = 'id';

        for (let i = length; i > 0; --i) {
            text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
        }

        return text;
    }

}
