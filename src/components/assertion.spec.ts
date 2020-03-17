import {Assertion} from '@/components/assertion';

describe('Assertion', () => {
    it('should not parse unknown', () => {
        expect(new Assertion().parse({bla: 123})).toBeUndefined();
    });

    it('should parse expectToBeEqualTo', () => {
        expect(new Assertion().parse({expect: 'statusCode', toBeEqualTo: 200})).toEqual({
            assertion: 'expect',
            assertionValue: 'statusCode',
            expected: 'toBeEqualTo',
            expectedValue: 200,
        });
    });

    it('should set empty string for null assertion', () => {
        expect(new Assertion().parse({expect: null, toBeEqualTo: null})).toEqual({
            assertion: 'expect',
            assertionValue: '',
            expected: 'toBeEqualTo',
            expectedValue: '',
        });
    });

    it('should set empty string for null expected', () => {
        expect(new Assertion().parse({expect: 'statusCode', toBeEqualTo: null})).toEqual({
            assertion: 'expect',
            assertionValue: 'statusCode',
            expected: 'toBeEqualTo',
            expectedValue: '',
        });
    });

    it('should parse expectToGreaterThan', () => {
        expect(new Assertion().parse({expect: 'statusCode', toBeGreaterThanOrEqualTo: 200})).toEqual({
            assertion: 'expect',
            assertionValue: 'statusCode',
            expected: 'toBeGreaterThanOrEqualTo',
            expectedValue: 200,
        });
    });

    it('should ignore some fields expectToLessThan', () => {
        expect(new Assertion().parse({
            expect: 'statusCode',
            toBeLessThan: 200,
            id: 'id',
            not: true,
            name: 'bla'
        })).toEqual({
            assertion: 'expect',
            assertionValue: 'statusCode',
            expected: 'toBeLessThan',
            expectedValue: 200,
        });
    });

    it('should parse expectToBeDefined', () => {
        expect(new Assertion().parse({
            expectToBeDefined: 'statusCode',
        })).toEqual({
            assertion: 'expectToBeDefined',
            assertionValue: 'statusCode'
        });
    });
});
