<template>
    <div :class="resultShallowTestTable">
        <a :class="lineClass" href="#" style="text-decoration: none">
            <div :class="indexClass">
                #{{index}}
            </div>
            <div class="col-4 align-self-center">
                {{test.name}}
            </div>
            <div class="col align-self-center">
                {{test.description}}
            </div>
            <div :class="testClass">
                {{test.valid ? 'pass': 'fail'}}
            </div>
        </a>

    </div>
</template>

<script>

    export default {
        name: 'ResultShallowTestItem',
        props: {
            test: {},
            index: {}
        },
        data: function () {
            return {
            }
        },
        computed: {
            resultShallowTestTable: function() {
                return {
                }
            },
            lineClass: function() {
                return {
                    'even-class': this.index % 2 === 0,
                    'odd-class': this.index % 2 === 1,
                    'row no-gutters': true
                }
            },
            indexClass: function() {
                return {
                    'align-self-center': true,
                    'tag': true,
                    'col-1': true,
                    'ml-1': true
                }
            },
            testClass: function() {
                return {
                    'align-self-center': true,
                    'tag': true,
                    'col-1': true,
                    'passing-test-color': this.test.valid,
                    'failing-test-color': !this.test.valid
                }
            },
        }
    }
</script>

<style scoped>
    .even-class {
        height: 30px;
        /*border-top: 1px solid #4d4d4d;*/
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #2b2b2b;
        /*border-left: 8px solid;*/
    }

    .odd-class {
        height: 30px;
        /*border-top: 1px solid #4d4d4d;*/
        border-bottom: 1px solid #4d4d4d;
        padding-left: 1px;
        background-color: #4d4d4d;
        /*border-left: 8px solid;*/
    }

    a:hover {
        /*background-color: #323232;*/
        color: white;
        height: 30px;
        border-left: 4px solid;
    }

    a {
        color: #bababa;
        height: inherit;
    }

    .tag {
        font-size: 0.8em;
        text-transform: uppercase;
        font-weight: bold;
    }

</style>
