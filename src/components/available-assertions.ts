export type Asserter = {
    value: string;
    name: string;
    expectedList: {
        name: string;
        value: string;
    }[];
};
export const availableAssertions: Asserter[] = [
    {
        value: 'Expect',
        name: 'expect',
        expectedList: [
            {
                name: 'toBeEqualTo',
                value: '=',
            },
            {
                name: 'toBeGreaterThanOrEqualTo',
                value: '≥',
            },
            {
                name: 'toBeGreaterThan',
                value: '>',
            },
            {
                name: 'toBeLessThanOrEqualTo',
                value: '≤',
            },
            {
                name: 'toBeLessThan',
                value: '<',
            },
            {
                name: 'toContain',
                value: 'to contain',
            }
        ]
    },
    {
        value: 'Expect to be defined',
        name: 'expectToBeDefined',
        expectedList: []
    },
    {
        value: 'Expect to be truthy',
        name: 'expectToBeTruthy',
        expectedList: []
    },
    {
        value: 'Expect to be falsy',
        name: 'expectToBeFalsy',
        expectedList: []
    },
    {
        value: 'Expect to be defined',
        name: 'expectToBeDefined',
        expectedList: []
    },
    {
        value: 'Expect to be undefined',
        name: 'expectToBeUndefined',
        expectedList: []
    }
];
