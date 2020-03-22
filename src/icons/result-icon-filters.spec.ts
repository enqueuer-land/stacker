import resultIconFilters from '@/icons/result-icon-filters';

describe('resultIconFilters', () => {
    it('valid filter should not accept ignore tests', () => {
        const valid = resultIconFilters.find(filter => filter.icon.includes('check'));
        expect(valid!.filter({ignored: true} as any)).toBeFalsy();
    });

    it('valid filter should accept only valid tests', () => {
        const valid = resultIconFilters.find(filter => filter.icon.includes('check'));
        expect(valid!.filter({valid: true} as any)).toBeTruthy();
    });

    it('valid filter should be falsy when test fails', () => {
        const valid = resultIconFilters.find(filter => filter.icon.includes('check'));
        expect(valid!.filter({valid: false} as any)).toBeFalsy();
    });

    it('invalid filter should not accept ignore tests', () => {
        const invalid = resultIconFilters.find(filter => filter.icon.includes('times'));
        expect(invalid!.filter({ignored: true} as any)).toBeFalsy();
    });

    it('invalid filter should accept only invalid tests', () => {
        const invalid = resultIconFilters.find(filter => filter.icon.includes('times'));
        expect(invalid!.filter({valid: false} as any)).toBeTruthy();
    });

    it('invalid filter should be falsy when test passes', () => {
        const invalid = resultIconFilters.find(filter => filter.icon.includes('times'));
        expect(invalid!.filter({valid: true} as any)).toBeFalsy();
    });

    it('ignore filter should be truthy when test is ignored', () => {
        const ignored = resultIconFilters.find(filter => filter.icon.includes('exclamation'));
        expect(ignored!.filter({ignored: true} as any)).toBeTruthy();
    });
});
