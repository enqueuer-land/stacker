//TODO test it
export class ComponentParent {
    private readonly component: any;

    public constructor(component: object) {
        this.component = component;
    }

    public findHighestParent(): any {
        const parent = this.component.carabinaMeta.parent;
        if (parent) {
            return new ComponentParent(parent).findHighestParent();
        }
        return this.component;
    }

    public isGrandChildOf(parentComponent: any): boolean {
        const parent = this.component.carabinaMeta.parent;
        if (parent) {
            if (parent.id === parentComponent.id) {
                return true;
            }
            return new ComponentParent(this.component.carabinaMeta.parent).isGrandChildOf(parentComponent);
        }
        return false;
    }

}
