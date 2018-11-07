<template>
    <div class="key-value-input container-fluid p-0">
        <a href="#" style="text-decoration: none"
           @mouseover="mouseIsOver = true"
           @mouseleave="mouseIsOver = false"
        >
            <div class="row">
                <div class="pl-2 pr-0 align-self-center" style="width: 30px">
                    <a v-show="mouseIsOver" href="#" style="color: white">
                        <i @click="addPair" class="material-icons" style="transform: scale(0.6)">control_point</i>
                    </a>
                </div>
                <div class="col-11 pl-0 pt-2" style="font-size: 0.8em; color: white">
                    {{title}}
                </div>

            </div>
        </a>
        <div v-for="(pair, index) in pairs" :key="index" class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2"
                 @mouseover="pair.mouseIsOver = true"
                 @mouseleave="pair.mouseIsOver = false">
                <input @input="update(index, 'key', $event.target.value)" :value="pair.key" type="text"
                       class="form-control mr-1" style="background-color: transparent; color: white"
                       placeholder="key">
                <input @input="update(index, 'value', $event.target.value)" :value="pair.value" type="text"
                       class="form-control input-group-append ml-1" style="background-color: transparent; color: white"
                       placeholder="value">
                <div class="input-group-append">
                    <a href="#" style="color: var(--failing-test-color)">
                        <i v-show="pair.mouseIsOver" @click="removePair()" class="material-icons"
                           style="transform: scale(0.6)">highlight_off</i>
                    </a>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'KeyValueInput',
        props: ['title'],
        data: function () {
            return {
                mouseIsOver: false,
                pairs: []
            }
        },
        methods: {
            addPair: function () {
                if (this.pairs.every(pair => pair.key.length > 0)) {
                    this.pairs.push({
                        key: '',
                        value: '',
                        mouseIsOver: false
                    });
                }
                let mapped = {};
                this.pairs.forEach(pair => mapped[pair.key] = pair.value);
                this.$emit('input', mapped);
            },
            removePair: function () {
                this.pairs = this.pairs.filter(pair => !pair.mouseIsOver);
                let mapped = {};
                this.pairs.forEach(pair => mapped[pair.key] = pair.value);
                this.$emit('input', mapped);
            },
            update: function (index, field, value) {
                let mapped = {};
                this.pairs[index][field] = value;
                this.pairs.forEach(pair => mapped[pair.key] = pair.value);
                this.$emit('input', mapped);
            }
        },
    }
</script>

<style scoped>
    .key-value-input {

    }

</style>
