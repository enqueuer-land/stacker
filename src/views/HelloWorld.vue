<template>
    <div class="hello">
        <h1>{{ message }}</h1>
        <i class="fas fa-check-circle"></i>
        <div v-for="(child, index) in children" :key="index">
            <component :is="child" v-bind="{value: inner}"></component>
        </div>
        <b-button>Serve</b-button>
        <p>{{inner}}</p>
        <keep-alive>
            <component :is="magician && { template: magician }"/>
        </keep-alive>

        <button @click="add">Add Another</button>
        <h3 @click="runNqr" style="cursor: pointer">runNqr</h3>
    </div>
</template>

<script lang="ts">
    import {Vue} from 'vue-property-decorator';
    import {ipcRenderer, remote} from 'electron'

    // let loaded: any = undefined;
    ipcRenderer.on('ping', async () => {

        // const listItem = ((await import('/Users/guilherme.moraes/Dev/carabin/list-item.js')) as any);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        // const listItem = (await import('/Users/guilherme.moraes/Dev/carabin/welcome.js') as any).welcome as any;
        // const welcome = remote.getGlobal('welcome');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // console.log(listItem);
        // loaded = Vue.component('list-item', listItem);

        // const parser = new DOMParser();
        // const document = parser.parseFromString(welcome, 'text/html');
        // console.log('parser: ' + document);

        // loaded = Vue.component('async-component', document);

        // console.log(loaded);

        // console.log(loaded);
        // loaded = remote.getGlobal('loadedPlugins');
        // console.log('ping:' + loaded)
        // // console.log(`hello world: ${JSON.stringify(loaded)}`)
        // console.log(`hello world: ${loaded.template}`)
        // console.log(`hello methods: ${loaded.methods}`)
        // console.log(`hello data: ${typeof loaded.data}`)
        // console.log(`hello world: ${typeof loaded.methods.toggleMsg}`)
    });

    export default Vue.extend({
        name: 'HelloWorld',
        components: {},
        props: ['msg'],
        data() {
            return {
                inner: 'inner',
                message: this.msg,
                children: [] as any,
                magician: `<div>
                                <select>
                                   <option v-for="num in 20">{{ num }}</option>
                                </select>
                          </div>`
            }
        },
        methods: {
            runNqr: function () {

                const requisitionModel: any = {
                    delay: 0,
                    level: 0,
                    name: '',
                    publishers: [],
                    requisitions: [{
                        onInit: {
                            assertions: [
                                {
                                    name: 'virgs',
                                    expectToBeTruthy: false
                                }]
                        }
                    }],
                    subscriptions: [],
                    timeout: 0,
                    onInit: {
                        assertions: [
                            {
                                name: 'virgs',
                                expectToBeTruthy: false
                            }]
                    }
                };
                // this.$store.dispatch('runRequisition', requisitionModel);
                this.$store.dispatch('runRequisitionViaGlobal', requisitionModel);
            }, add: function () {
                // const externalFile = remote.getGlobal('fs').readFileSync('/Users/guilherme.moraes/Dev/carabina/external.js').toString();
                // console.log(externalFile);
                const external = remote.getGlobal('external');
                this.magician = external.html;
                this.message = external.sum(2, 6);
                const template = external.template;
                const data = () => {
                    return {
                        msg: "home"
                    };
                };

                // this.children.push(Vue.component('async-component', {template, data}));
                this.children.push(Vue.component('async-component', external.component));
            }, huehue: function (i: any) {
                console.log(i);
            }

        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .welcome {
        background-color: rebeccapurple;
    }

    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
