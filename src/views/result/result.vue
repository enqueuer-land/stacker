<template>
    <div id="result" style="height: 100%; background-color: var(--carabina-body-background-darker-color)">
        <template v-if="responses.length > 0">
            <ResultHeader style="height: var(--carabina-header-size)" :valid="responseIsValid" :name="responseName">
            </ResultHeader>
            <ResultFlattenTestsBody class="pt-3" style="height: var(--carabina-body-size)" :tests="filteredFlattenTests">
            </ResultFlattenTestsBody>
            <ResultFooter style="height: var(--carabina-footer-size)" :valid="false" :total-time="123456"
                          summary="10/12 (84%)" :ignored-tests="4">
            </ResultFooter>
        </template>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapGetters, mapMutations} from 'vuex';
    import ResultHeader from '@/views/result/result-header'
    import ResultFlattenTestsBody from '@/views/result/result-flatten-tests-body'
    import ResultFooter from '@/views/result/result-footer'

    export default Vue.extend({
        name: 'Result',
        components: {ResultHeader, ResultFooter, ResultFlattenTestsBody},
        mounted() {
            this.$store.subscribe((mutation) => {
                if (mutation.type === 'stage/updateResponse') {
                    // mutation.payload;
                    this.updateResponse([{
                        "valid": false,
                        "name": "enqueuer",
                        "id": "1441100224_3eec7d856d_980237",
                        "level": 0,
                        "subscriptions": [],
                        "publishers": [],
                        "iteration": 0,
                        "totalIterations": 1,
                        "hooks": {
                            "onInit": {
                                "valid": true,
                                "tests": [],
                                "arguments": {
                                    "elapsedTime": 0
                                }
                            },
                            "onFinish": {
                                "valid": true,
                                "tests": [],
                                "arguments": {
                                    "elapsedTime": 27
                                }
                            },
                            "onParsed": {
                                "valid": true,
                                "tests": []
                            }
                        },
                        "time": {
                            "startTime": "2020-02-17T17:41:10.227Z",
                            "endTime": "2020-02-17T17:41:10.254Z",
                            "totalTime": 27
                        },
                        "requisitions": [
                            {
                                "valid": false,
                                "name": "test.yml",
                                "id": "1441100224_8ae806c4c9_614076",
                                "level": 1,
                                "subscriptions": [
                                    {
                                        "id": "1441100224_ec23fb6a05_777981",
                                        "name": "subscription description",
                                        "type": "udp",
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "valid": true,
                                                        "name": "Message received",
                                                        "description": "Subscription has received its messageSubscription has received its messageSubscription has received its messageSubscription has received its messageSubscription has received its messageSubscription has received its message"
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 10
                                                }
                                            },
                                            "onMessageReceived": {
                                                "valid": false,
                                                "tests": [
                                                    {
                                                        "name": "Payload",
                                                        "valid": true,
                                                        "description": "Expected 'payload' to be equal to 'it'. Received 'it'"
                                                    },
                                                    {
                                                        "name": "Remote Address",
                                                        "valid": true,
                                                        "description": "Expected 'remoteInfo.address' to be equal to '127.0.0.1'. Received '127.0.0.1'"
                                                    },
                                                    {
                                                        "name": "Assertion #2",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false"
                                                    }
                                                ],
                                                "arguments": {
                                                    "payload": {
                                                        "type": "Buffer",
                                                        "data": [
                                                            105,
                                                            116
                                                        ]
                                                    },
                                                    "remoteInfo": {
                                                        "address": "127.0.0.1",
                                                        "family": "IPv4",
                                                        "port": 62929,
                                                        "size": 2
                                                    },
                                                    "elapsedTime": 9
                                                }
                                            }
                                        },
                                        "valid": false,
                                        "subscriptionTime": "2020-02-17T17:41:10.236Z"
                                    }
                                ],
                                "publishers": [
                                    {
                                        "id": "1441100224_f1c5db9ba9_15108",
                                        "name": "publisher description",
                                        "valid": true,
                                        "hooks": {
                                            "onInit": {
                                                "arguments": {
                                                    "elapsedTime": 0
                                                },
                                                "tests": [],
                                                "valid": true
                                            },
                                            "onFinish": {
                                                "arguments": {
                                                    "elapsedTime": 11
                                                },
                                                "tests": [
                                                    {
                                                        "name": "Published",
                                                        "valid": true,
                                                        "description": "Published successfully"
                                                    }
                                                ],
                                                "valid": true
                                            }
                                        },
                                        "type": "udp",
                                        "publishTime": "2020-02-17T17:41:10.239Z"
                                    }
                                ],
                                "iteration": 0,
                                "totalIterations": 4,
                                "hooks": {
                                    "onInit": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 0
                                        }
                                    },
                                    "onFinish": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 12
                                        }
                                    }
                                },
                                "time": {
                                    "startTime": "2020-02-17T17:41:10.229Z",
                                    "endTime": "2020-02-17T17:41:10.241Z",
                                    "totalTime": 12,
                                    "timeout": 5000
                                },
                                "requisitions": [
                                    {
                                        "valid": true,
                                        "name": "Requisition #0",
                                        "id": "1441100224_e6ea127e95_413314",
                                        "level": 2,
                                        "subscriptions": [],
                                        "publishers": [],
                                        "iteration": 0,
                                        "totalIterations": 1,
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "name": "Assertion #0",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false",
                                                        "ignored": true
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 1
                                                }
                                            }
                                        },
                                        "time": {
                                            "startTime": "2020-02-17T17:41:10.231Z",
                                            "endTime": "2020-02-17T17:41:10.233Z",
                                            "totalTime": 2,
                                            "timeout": 5000
                                        },
                                        "requisitions": []
                                    }
                                ]
                            },
                            {
                                "valid": false,
                                "name": "test.yml",
                                "id": "1441100224_8ae806c4c9_614076",
                                "level": 1,
                                "subscriptions": [
                                    {
                                        "id": "1441100224_ec23fb6a05_777981",
                                        "name": "subscription description",
                                        "type": "udp",
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "valid": true,
                                                        "name": "Message received",
                                                        "description": "Subscription has received its message"
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 5
                                                }
                                            },
                                            "onMessageReceived": {
                                                "valid": false,
                                                "tests": [
                                                    {
                                                        "name": "Payload",
                                                        "valid": true,
                                                        "description": "Expected 'payload' to be equal to 'it'. Received 'it'"
                                                    },
                                                    {
                                                        "name": "Remote Address",
                                                        "valid": true,
                                                        "description": "Expected 'remoteInfo.address' to be equal to '127.0.0.1'. Received '127.0.0.1'"
                                                    },
                                                    {
                                                        "name": "Assertion #2",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false"
                                                    }
                                                ],
                                                "arguments": {
                                                    "payload": {
                                                        "type": "Buffer",
                                                        "data": [
                                                            105,
                                                            116
                                                        ]
                                                    },
                                                    "remoteInfo": {
                                                        "address": "127.0.0.1",
                                                        "family": "IPv4",
                                                        "port": 59573,
                                                        "size": 2
                                                    },
                                                    "elapsedTime": 4
                                                }
                                            }
                                        },
                                        "valid": false,
                                        "subscriptionTime": "2020-02-17T17:41:10.245Z"
                                    }
                                ],
                                "publishers": [
                                    {
                                        "id": "1441100224_f1c5db9ba9_15108",
                                        "name": "publisher description",
                                        "valid": true,
                                        "hooks": {
                                            "onInit": {
                                                "arguments": {
                                                    "elapsedTime": 0
                                                },
                                                "tests": [],
                                                "valid": true
                                            },
                                            "onFinish": {
                                                "arguments": {
                                                    "elapsedTime": 4
                                                },
                                                "tests": [
                                                    {
                                                        "name": "Published",
                                                        "valid": true,
                                                        "description": "Published successfully"
                                                    }
                                                ],
                                                "valid": true
                                            }
                                        },
                                        "type": "udp",
                                        "publishTime": "2020-02-17T17:41:10.247Z"
                                    }
                                ],
                                "iteration": 1,
                                "totalIterations": 4,
                                "hooks": {
                                    "onInit": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 0
                                        }
                                    },
                                    "onFinish": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 5
                                        }
                                    }
                                },
                                "time": {
                                    "startTime": "2020-02-17T17:41:10.243Z",
                                    "endTime": "2020-02-17T17:41:10.248Z",
                                    "totalTime": 5,
                                    "timeout": 5000
                                },
                                "requisitions": [
                                    {
                                        "valid": true,
                                        "name": "Requisition #0",
                                        "id": "1441100224_e6ea127e95_413314",
                                        "level": 2,
                                        "subscriptions": [],
                                        "publishers": [],
                                        "iteration": 0,
                                        "totalIterations": 1,
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "name": "Assertion #0",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false",
                                                        "ignored": true
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 1
                                                }
                                            }
                                        },
                                        "time": {
                                            "startTime": "2020-02-17T17:41:10.244Z",
                                            "endTime": "2020-02-17T17:41:10.245Z",
                                            "totalTime": 1,
                                            "timeout": 5000
                                        },
                                        "requisitions": []
                                    }
                                ]
                            },
                            {
                                "valid": false,
                                "name": "test.yml",
                                "id": "1441100224_8ae806c4c9_614076",
                                "level": 1,
                                "subscriptions": [
                                    {
                                        "id": "1441100224_ec23fb6a05_777981",
                                        "name": "subscription description",
                                        "type": "udp",
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "valid": true,
                                                        "name": "Message received",
                                                        "description": "Subscription has received its message"
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 2
                                                }
                                            },
                                            "onMessageReceived": {
                                                "valid": false,
                                                "tests": [
                                                    {
                                                        "name": "Payload",
                                                        "valid": true,
                                                        "description": "Expected 'payload' to be equal to 'it'. Received 'it'"
                                                    },
                                                    {
                                                        "name": "Remote Address",
                                                        "valid": true,
                                                        "description": "Expected 'remoteInfo.address' to be equal to '127.0.0.1'. Received '127.0.0.1'"
                                                    },
                                                    {
                                                        "name": "Assertion #2",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false"
                                                    }
                                                ],
                                                "arguments": {
                                                    "payload": {
                                                        "type": "Buffer",
                                                        "data": [
                                                            105,
                                                            116
                                                        ]
                                                    },
                                                    "remoteInfo": {
                                                        "address": "127.0.0.1",
                                                        "family": "IPv4",
                                                        "port": 62957,
                                                        "size": 2
                                                    },
                                                    "elapsedTime": 1
                                                }
                                            }
                                        },
                                        "valid": false,
                                        "subscriptionTime": "2020-02-17T17:41:10.250Z"
                                    }
                                ],
                                "publishers": [
                                    {
                                        "id": "1441100224_f1c5db9ba9_15108",
                                        "name": "publisher description",
                                        "valid": true,
                                        "hooks": {
                                            "onInit": {
                                                "arguments": {
                                                    "elapsedTime": 0
                                                },
                                                "tests": [],
                                                "valid": true
                                            },
                                            "onFinish": {
                                                "arguments": {
                                                    "elapsedTime": 2
                                                },
                                                "tests": [
                                                    {
                                                        "name": "Published",
                                                        "valid": true,
                                                        "description": "Published successfully"
                                                    }
                                                ],
                                                "valid": true
                                            }
                                        },
                                        "type": "udp",
                                        "publishTime": "2020-02-17T17:41:10.250Z"
                                    }
                                ],
                                "iteration": 2,
                                "totalIterations": 4,
                                "hooks": {
                                    "onInit": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 0
                                        }
                                    },
                                    "onFinish": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 2
                                        }
                                    }
                                },
                                "time": {
                                    "startTime": "2020-02-17T17:41:10.249Z",
                                    "endTime": "2020-02-17T17:41:10.251Z",
                                    "totalTime": 2,
                                    "timeout": 5000
                                },
                                "requisitions": [
                                    {
                                        "valid": true,
                                        "name": "Requisition #0",
                                        "id": "1441100224_e6ea127e95_413314",
                                        "level": 2,
                                        "subscriptions": [],
                                        "publishers": [],
                                        "iteration": 0,
                                        "totalIterations": 1,
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "name": "Assertion #0",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false",
                                                        "ignored": true
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            }
                                        },
                                        "time": {
                                            "startTime": "2020-02-17T17:41:10.249Z",
                                            "endTime": "2020-02-17T17:41:10.250Z",
                                            "totalTime": 1,
                                            "timeout": 5000
                                        },
                                        "requisitions": []
                                    }
                                ]
                            },
                            {
                                "valid": false,
                                "name": "test.yml",
                                "id": "1441100224_8ae806c4c9_614076",
                                "level": 1,
                                "subscriptions": [
                                    {
                                        "id": "1441100224_ec23fb6a05_777981",
                                        "name": "subscription description",
                                        "type": "udp",
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "valid": true,
                                                        "name": "Message received",
                                                        "description": "Subscription has received its message"
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 1
                                                }
                                            },
                                            "onMessageReceived": {
                                                "valid": false,
                                                "tests": [
                                                    {
                                                        "name": "Payload",
                                                        "valid": true,
                                                        "description": "Expected 'payload' to be equal to 'it'. Received 'it'"
                                                    },
                                                    {
                                                        "name": "Remote Address",
                                                        "valid": true,
                                                        "description": "Expected 'remoteInfo.address' to be equal to '127.0.0.1'. Received '127.0.0.1'"
                                                    },
                                                    {
                                                        "name": "Assertion #2",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false"
                                                    }
                                                ],
                                                "arguments": {
                                                    "payload": {
                                                        "type": "Buffer",
                                                        "data": [
                                                            105,
                                                            116
                                                        ]
                                                    },
                                                    "remoteInfo": {
                                                        "address": "127.0.0.1",
                                                        "family": "IPv4",
                                                        "port": 51193,
                                                        "size": 2
                                                    },
                                                    "elapsedTime": 1
                                                }
                                            }
                                        },
                                        "valid": false,
                                        "subscriptionTime": "2020-02-17T17:41:10.252Z"
                                    }
                                ],
                                "publishers": [
                                    {
                                        "id": "1441100224_f1c5db9ba9_15108",
                                        "name": "publisher description",
                                        "valid": true,
                                        "hooks": {
                                            "onInit": {
                                                "arguments": {
                                                    "elapsedTime": 0
                                                },
                                                "tests": [],
                                                "valid": true
                                            },
                                            "onFinish": {
                                                "arguments": {
                                                    "elapsedTime": 1
                                                },
                                                "tests": [
                                                    {
                                                        "name": "Published",
                                                        "valid": true,
                                                        "description": "Published successfully"
                                                    }
                                                ],
                                                "valid": true
                                            }
                                        },
                                        "type": "udp",
                                        "publishTime": "2020-02-17T17:41:10.253Z"
                                    }
                                ],
                                "iteration": 3,
                                "totalIterations": 4,
                                "hooks": {
                                    "onInit": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 0
                                        }
                                    },
                                    "onFinish": {
                                        "valid": true,
                                        "tests": [],
                                        "arguments": {
                                            "elapsedTime": 2
                                        }
                                    }
                                },
                                "time": {
                                    "startTime": "2020-02-17T17:41:10.251Z",
                                    "endTime": "2020-02-17T17:41:10.253Z",
                                    "totalTime": 2,
                                    "timeout": 5000
                                },
                                "requisitions": [
                                    {
                                        "valid": true,
                                        "name": "Requisition #0",
                                        "id": "1441100224_e6ea127e95_413314",
                                        "level": 2,
                                        "subscriptions": [],
                                        "publishers": [],
                                        "iteration": 0,
                                        "totalIterations": 1,
                                        "hooks": {
                                            "onInit": {
                                                "valid": true,
                                                "tests": [
                                                    {
                                                        "name": "Assertion #0",
                                                        "valid": false,
                                                        "description": "Expecting 'false' to be true. Received: false",
                                                        "ignored": true
                                                    }
                                                ],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            },
                                            "onFinish": {
                                                "valid": true,
                                                "tests": [],
                                                "arguments": {
                                                    "elapsedTime": 0
                                                }
                                            }
                                        },
                                        "time": {
                                            "startTime": "2020-02-17T17:41:10.252Z",
                                            "endTime": "2020-02-17T17:41:10.252Z",
                                            "totalTime": 0,
                                            "timeout": 5000
                                        },
                                        "requisitions": []
                                    }
                                ]
                            }
                        ]
                    }]);
                }
            });
        },
        computed: {
            ...mapGetters('result', ['responses', 'filteredFlattenTests', 'responseIsValid', 'responseName']),
        },
        methods: {
            ...mapMutations('result', ['updateResponse'])
        }
    });
</script>
