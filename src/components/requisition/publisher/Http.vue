<template>
    <fieldset>
        <div class="input-group">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">{{init.method}}</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="(current) of methods" v-on:click="init.method=current">{{current}}</a>
                </div>
            </div>
            <input v-model="init.url" label="URL" type="text" class="form-control" aria-label="Text input with dropdown button" >
        </div>

        <br/>
        <label>Payload</label>
        <TextArea v-if="init.method !== 'GET'" v-model="init.payload" />
    </fieldset>
</template>

<script lang="ts">
    import * as TextArea from '../../form/TextArea';
    import * as Input from '../../form/Input';

    export default {
        name: 'HttpClient',
        components: {
            TextArea,
            Input
        },
        props: ['init'],
        data() {
            return {
                synchronous: true,
                methods: ['GET', 'POST', 'PUT', 'HEAD']
            }
        }
    }
</script>
