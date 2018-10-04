<template>
    <div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">{{label}}</span>
            </div>
            <input type="text" class="form-control" placeholder="label" aria-label="Username" aria-describedby="basic-addon1" v-model="code" >
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Input',
        props: ['default', 'label'],
        mounted() {
            this.code = this.default;
        },
        data() {
            return {
                code: this.value
            }
        },
        watch: {
            code(val) {
                this.$emit('input', val);
            }
        }
    }
</script>
