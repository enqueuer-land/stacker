//TODO test it
export class ComponentParent {
    private readonly component: any;

    public constructor(component: object) {
        this.component = component;
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
