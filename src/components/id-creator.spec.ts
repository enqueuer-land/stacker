import {IdCreator} from '@/components/id-creator';

describe('IdCreator', () => {

    it('should accept possible values', () => {
        const possible = 'ABC';
        const letters = new IdCreator(possible).create().split('');
        expect(letters.every(letter => possible.concat('ID').includes(letter))).toBeTruthy();
    });

    it('should has exact length', () => {
        const length = 10;
        expect(new IdCreator().create(length).length).toBe(length);
    });

    it('should begin with "ID"', () => {
        expect(new IdCreator().create().startsWith('ID')).toBeTruthy();
    });

});
