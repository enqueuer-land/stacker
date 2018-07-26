<template>
    <div>
        <label>OnMessageReceived</label><br/>
        <textarea name="onMessageReceived" rows="4" cols="50" v-model="value" v-on:change="emitChanges" ></textarea>
    </div>
</template>

<script lang="ts">

    export default {
        name: 'OnMessageReceived',
        mounted() {
            this.$emit("input", this.value);
        },
        data() {
            return {
                value: 'test[\'It is online\'] = JSON.parse(message).statusCode == 200'
            }
        },
        methods: {
            emitChanges() {
//                this.$emit("onChange", JSON.parse(JSON.stringify(this.$data)));
                this.$emit("input", this.value);
            }
        }
    }
</script>
