export const assertions = [
    {
        value: 'Expect',
        name: 'expect',
        criteria: [
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
            // {
            //     name: 'toContain',
            //     value: 'to contain',
            // }
        ]
    },
    {
        value: 'Expect to be defined',
        name: 'expectToBeDefined',
        criteria: []
    },
    {
        value: 'Expect to be truthy',
        name: 'expectToBeTruthy',
        criteria: []
    },
    {
        value: 'Expect to be falsy',
        name: 'expectToBeFalsy',
        criteria: []
    },
    {
        value: 'Expect to be defined',
        name: 'expectToBeDefined',
        criteria: []
    },
    {
        value: 'Expect to be undefined',
        name: 'expectToBeUndefined',
        criteria: []
    }
];
