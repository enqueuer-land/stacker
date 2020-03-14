import {ComponentFinder} from '@/components/component-finder';

describe('ComponentFinder', () => {

    it('should return undefined when item is not found', () => {
        expect(new ComponentFinder([]).findItem('bla')).toBeUndefined();
    });

    it('should find when item is in first level', () => {
        const requisition = {id: 'id'};
        expect(new ComponentFinder([requisition]).findItem(requisition.id))
            .toEqual(requisition);
    });

    it('should find when item is in second level (requisition)', () => {
        const requisitions = [{requisitions: [{id: 'id'}]}];
        expect(new ComponentFinder(requisitions).findItem(requisitions[0].requisitions[0].id))
            .toEqual(requisitions[0].requisitions[0]);
    });

    it('should find when item is in second level (publisher)', () => {
        const requisitions = [{publishers: [{id: 'id'}]}];
        expect(new ComponentFinder(requisitions).findItem(requisitions[0].publishers[0].id))
            .toEqual(requisitions[0].publishers[0]);
    });

    it('should find when item is in second level (subscription)', () => {
        const requisitions = [{subscriptions: [{id: 'id'}]}];
        expect(new ComponentFinder(requisitions).findItem(requisitions[0].subscriptions[0].id))
            .toEqual(requisitions[0].subscriptions[0]);
    });

    it('should find when item is in third level (requisition)', () => {
        const requisitions = [{requisitions: [{requisitions: [{id: 'id'}]}]}];
        expect(new ComponentFinder(requisitions).findItem(requisitions[0].requisitions[0].requisitions[0].id))
            .toEqual(requisitions[0].requisitions[0].requisitions[0]);
    });


});
