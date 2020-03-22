import {availableAssertions} from '@/assertions/available-assertions';

type AssertionType = {
    //expect
    assertion: string;
    //statusCode
    assertionValue: string;
    //toBeEqualTo
    expected?: string;
    //200
    expectedValue?: string;
};

const ignoredFields = ['id', 'not', 'ignored', 'name'];

export class Assertion {
    public parse = (value: any): AssertionType | undefined => {
        const result: any = {};
        Object.keys(value)
            .forEach(key => {
                if (ignoredFields.includes(key)) {
                    return;
                }
                const assertion = availableAssertions.find(possible => possible.name === key);
                if (!assertion) {
                    return;
                }
                result.assertion = assertion.name;
                result.assertionValue = value[key] || '';
                const expected = assertion.expectedList.find(item => value[item.name] !== undefined);
                if (!expected) {
                    return;
                }
                result.expected = expected.name;
                result.expectedValue = value[expected.name] || '';
            });
        if (Object.keys(result).length > 0) {
            return result;
        }
    };
}
