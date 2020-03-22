export class IdCreator {

    private possible: string;

    public constructor(possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
        this.possible = possible;
    }

    public create(length = 30): string {
        let text = 'ID';

        for (let i = length - text.length; i > 0; --i) {
            text += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
        }

        return text;
    }

}
