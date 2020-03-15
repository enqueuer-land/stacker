export default [{
    name: 'Example requisition',
    publishers: [{
        type: 'HTTP',
        name: 'Example publisher',
        url: 'http://localhost:80/stacker/123?value=456',
        method: 'POST',
        headers: {'content-type': 'json/application'},
        payload: 'stacker',
        onResponseReceived: {
            script: 'payload = JSON.parse(body)',
            assertions: [{
                expect: 'payload.stacker',
                toBeEqualTo: '`rocks`'
            }, {
                expect: 'statusCode',
                toBeEqualTo: '200'
            }, {
                expect: 'headers.key',
                toBeEqualTo: '`value`'
            }]
        }
    }],
    subscriptions: [{
        type: 'HTTP',
        port: 80,
        endpoint: '/stacker/:id',
        method: 'POST',
        response: {
            headers: {'key': 'value'},
            status: 200,
            payload: JSON.stringify({
                stacker: 'rocks'
            }, null, 2)
        },
        name: 'Example subscription',
        onMessageReceived: {
            assertions: [{
                expect: 'body',
                toBeEqualTo: '`stacker`'
            }, {
                expect: 'params.id',
                toBeEqualTo: '123'
            }, {
                expect: 'query.value',
                toBeEqualTo: 456
            }]
        }
    }],
    onInit: {
        script: 'console.log("Stacker truly rocks")'
    }
}]
