import {IdCreator} from '@/components/id-creator';
import {ComponentParent} from '@/components/component-parent';

describe('ComponentParent', () => {

    it('should find highest parent', () => {
        const highestParent = {id: new IdCreator().create(), carabinaMeta: {}};
        const secondParent = {id: new IdCreator().create(), carabinaMeta: {parent: highestParent}};
        const firstParent = {id: new IdCreator().create(), carabinaMeta: {parent: secondParent}};
        const grandChild = {id: new IdCreator().create(), carabinaMeta: {parent: firstParent}};

        expect(new ComponentParent(grandChild).findHighestParent()).toEqual(highestParent);
    });

    it('should return itself when it has no parent (like Adam and Eve)', () => {
        const component = {id: new IdCreator().create(), carabinaMeta: {}};
        expect(new ComponentParent(component).findHighestParent()).toEqual(component);
    });

    it('should not be grand child of an unrelated component', () => {
        const component: any = {id: new IdCreator().create(), carabinaMeta: {}};
        expect(new ComponentParent(component).isGrandChildOf({id: 'unrelated', carabinaMeta: {}} as any)).toBeFalsy();
    });

    it('should not be grand child of itself', () => {
        const component: any = {id: new IdCreator().create(), carabinaMeta: {}};
        expect(new ComponentParent(component).isGrandChildOf(component)).toBeFalsy();
    });

    it('should not be grand child of itself', () => {
        const component: any = {id: new IdCreator().create(), carabinaMeta: {}};
        expect(new ComponentParent(component).isGrandChildOf(component)).toBeFalsy();
    });

    it('should be grand child of its parent', () => {
        const parent: any = {id: new IdCreator().create(), carabinaMeta: {}};
        const component = {id: new IdCreator().create(), carabinaMeta: {parent}};

        expect(new ComponentParent(component).isGrandChildOf(parent)).toBeTruthy();
    });

    it('should be grand child of its grandparent', () => {
        const grandparent: any = {id: new IdCreator().create(), carabinaMeta: {}};
        const parent = {id: new IdCreator().create(), carabinaMeta: {parent: grandparent}};
        const component = {id: new IdCreator().create(), carabinaMeta: {parent}};

        expect(new ComponentParent(component).isGrandChildOf(grandparent)).toBeTruthy();
    });

});
