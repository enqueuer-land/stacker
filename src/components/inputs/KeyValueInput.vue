<template>
    <div class="key-value-input">
        <div class="row no-gutters pt-1 stacker-label"
             data-toggle="collapse" :data-target="'#' + id"
             style="cursor: pointer"
             @click="headerClick">
            <div class="col-4 row no-gutters">
                <div class="col-md-auto title-class">
                    {{title}}
                </div>
                <i class="col-md-auto material-icons showing-icon" :id="id + 'ShowingIcon'">keyboard_arrow_right</i>
            </div>
            <div v-if="!showValues" class="col" style="border-top: var(--text-smooth-color) 1px solid; position: relative; top: 10px"></div>
        </div>
        <div :id="id" class="collapse">
            <div class="row px-3">
                <div class="input-group input-group-sm mb-1" v-for="(pair, index) in pairs" :key="index">
                    <input @input="update(index, 'key', $event.target.value)" :value="pair.key" type="text"
                           class="form-control stacker-input"
                           placeholder="key">
                    <input @input="update(index, 'value', $event.target.value)" :value="pair.value" type="text"
                           class="form-control input-group-append ml-2 stacker-input"
                           placeholder="value">
                    <div class="input-group-append pl-1">
                        <a href="#" style="color: var(--text-color)">
                            <i @click="removePair(index)" class="material-icons"
                               style="position: relative; top: calc(50% - 12px)">highlight_off</i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="row px-3">
                <button type="button" :class="['btn btn-block btn-sm col', addButtonClass]"
                        id="addButton"
                        :style="addButtonStyle"
                        @click="addPair">Add
                </button>
            </div>
        </div>
        <div v-if="showValues" class="row mt-3 mx-4" style="border-bottom: var(--text-smooth-color) 1px solid;"></div>
    </div>
</template>

<script>
    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'KeyValueInput',
        props: ['title', 'value'],
        data: function () {
            return {
                id: generateId(),
                pairs: this.getContent(),
                showValues: false
            }
        },
        watch: {
            value: function () {
                this.pairs = this.getContent()
            }
        },
        methods: {
            headerClick() {
                const isShowing = !$('#' + this.id).hasClass('show');
                const showingIcon = $('#' + this.id + 'ShowingIcon');
                if (isShowing) {
                    showingIcon.addClass('showing-icon-active');
                    this.showValues = true;
                } else {
                    this.showValues = false;
                    showingIcon.removeClass('showing-icon-active');
                }
            },
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
                return this.pairs.every(pair => pair.key.length > 0 && pair.value.length > 0);
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
            addButtonClass() {
                return {
                    'disabled': !this.canAddPair()
                }
            },
            addButtonStyle() {
                if (this.canAddPair()) {
                    return {
                        'background-color': 'transparent',
                        color: 'var(--text-color)',
                        'border-color': 'var(--text-smooth-color)',
                    }
                }
                return {
                    'background-color': 'var(--stacker-header-background-color)',
                    color: 'var(--stacker-background-alternative-color)',
                    'border-color': 'var(--stacker-background-alternative-color)',
                }
            }
        }
    }
</script>

<style scoped>
    .key-value-input {

    }

    #addButton:focus, #addButton.focus {
        outline: 0;
        box-shadow: 0 0 15px var(--text-smooth-color);
    }

    .title-class {
        color: var(--text-smooth-color);
    }

    .title-class:hover, .title-class.hover {
        color: var(--text-color);
    }

    .showing-icon {
        color: var(--text-color);
        transform: scale(0.9);
        position: relative;
        top: -2px;
        transition: transform 50ms ease;
    }

    .showing-icon:hover {
        transform: scale(0.85) rotate(45deg);
    }

    .showing-icon-active {
        transform: scale(0.7) rotate(90deg);
    }

</style>
