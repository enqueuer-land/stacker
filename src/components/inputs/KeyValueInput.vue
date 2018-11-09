<template>
    <div class="key-value-input container-fluid p-0">
        <div class="row pt-1 px-2" style="font-size: 0.8em; color: white">
            {{title}}
        </div>
        <div class="row px-2">
            <div class="input-group input-group-sm mb-1" v-for="(pair, index) in pairs" :key="index">
                <input @input="update(index, 'key', $event.target.value)" :value="pair.key" type="text"
                       class="form-control" style="background-color: transparent; color: white"
                       placeholder="key">
                <input @input="update(index, 'value', $event.target.value)" :value="pair.value" type="text"
                       class="form-control input-group-append ml-1" style="background-color: transparent; color: white"
                       placeholder="value">
                <div class="input-group-append pl-1">
                    <a href="#" style="color: white">
                        <i @click="removePair(index)" class="material-icons"
                           style="transform: scale(0.75)">highlight_off</i>
                    </a>
                </div>
            </div>
        </div>
        <div class="row px-2">
            <button type="button" :class="['btn btn-block btn-sm col', isAddButtonDisabled]"
                    style="background-color: white; color: var(--stacker-background-color); border-color: white"
                    @click="addPair">Add
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'KeyValueInput',
        props: ['title', 'value'],
        data: function () {
            return {
                pairs: this.getContent()
            }
        },
        watch: {
          value: function() {
              this.pairs = this.getContent()
          }
        },
        methods: {
            getContent() {
                const pairs = [];
                Object.keys(this.value || {}).forEach(key => {
                    pairs.push({
                        key: key,
                        value: this.value[key],
                    });
                });
                return pairs;
            },
            emitEvent() {
                let mapped = {};
                this.pairs.forEach(pair => mapped[pair.key] = pair.value);
                this.$emit('input', mapped);
            },
            addPair: function () {
                if (this.canAddPair()) {
                    this.pairs.push({
                        key: '',
                        value: '',
                    });
                }
            },
            canAddPair: function () {
                return this.pairs.every(pair => pair.key.length > 0);
            },
            removePair: function (index) {
                this.pairs = this.pairs.filter((_, itemIndex) => itemIndex !== index);
                this.emitEvent();
            },
            update: function (index, field, value) {
                this.pairs[index][field] = value;
                this.emitEvent();
            }
        },
        computed: {
            isAddButtonDisabled: function () {
                return {
                    'disabled': !this.canAddPair()
                }
            }
        }
    }
</script>

<style scoped>
    .key-value-input {

    }

</style>
