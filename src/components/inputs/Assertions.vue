<template>
    <div class="assertions container pl-0">
        <div class="row no-gutters pt-1 stacker-label"
             data-toggle="collapse" :data-target="'#' + id"
             @click="headerClick">
            <div class="col-4 row no-gutters">
                <div class="col-md-auto pl-2 title-class">
                    Assertions {{`(${assertions.length})`}}
                </div>
                <i class="col-md-auto material-icons showing-icon" :id="id + 'ShowingIcon'">keyboard_arrow_right</i>
            </div>
            <div v-if="!showValues" class="col white-bar mt-2"></div>
        </div>
        <div :id="id" class="collapse">
            <div v-for="(_, index) in assertions" :key="ids[index]" class="row px-2 no-gutters">
                <assertion v-model="assertions[index]" class="col px-2 mb-2 pb-1"/>
                <div class="col-md-auto px-0 mb-2">
                    <div class="x-button pr-2">
                        <div style="position: relative; top: calc(50% - 12px); left: calc(50% - 12px);">
                            <stacker-icon name="highlight_off" color="var(--failing-test-color)"
                                          @click="removeAssertion(index)"></stacker-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row px-2 no-gutters">
                <button type="button" :class="['btn btn-block btn-sm col']" id="addButton"
                        :style="addButtonStyle"
                        @click="addAssertion">Add
                </button>
            </div>
        </div>
        <div v-if="showValues" class="row no-gutters my-3 mx-4 white-bar"></div>
    </div>
</template>

<script>

    import Assertion from "./Assertion";
    import {generateId} from "../../tests/id-generator";
    import StackerIcon from "./StackerIcon";

    export default {
        name: 'Assertions',
        components: {StackerIcon, Assertion},
        props: {
            value: {}
        },
        data: function () {
            return {
                id: generateId(),
                showValues: false,
                ids: (this.value || []).map(() => generateId()),
                assertions: this.value || [],
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
            addAssertion: function () {
                if (this.canAddAssertion()) {
                    this.ids.push(generateId());
                    this.assertions.push({
                        name: `Assertion #${this.assertions.length}`,
                        expect: ''
                    })
                }
            },
            removeAssertion: function (indexToRemove) {
                this.ids = this.ids.splice(indexToRemove, 1);
                this.assertions = this.assertions.filter((assertion, index) => index !== indexToRemove);
            },
            canAddAssertion: function () {
                return this.assertions.every(assertion => Object.keys(assertion).every(key => assertion[key].length > 0));
            },
        },
        watch: {
            assertions: function () {
                this.$emit('input', this.assertions);
            },
            value: function () {
                if (this.value !== this.assertions) {
                    this.assertions = [];
                    (this.value || []).forEach((item) => {
                        this.ids.push(generateId());
                        this.assertions.push(item);
                    });
                }
            },
        },
        computed: {
            addButtonStyle() {
                if (this.canAddAssertion()) {
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
    .assertions {

    }

    #addButton:focus, #addButton.focus {
        outline: 0;
        box-shadow: 0 0 15px var(--text-smooth-color);
    }

    #addButton:hover, #addButton.hover {
        outline: 0;
        box-shadow: 0 0 5px var(--text-color);
    }

    .x-button {
        height: 100%;
        width: 100%;
        background-color: var(--stacker-header-background-color);
        border-right: 1px solid var(--stacker-background-alternative-color);
        border-top: 1px solid var(--stacker-background-alternative-color);
        border-bottom: 1px solid var(--stacker-background-alternative-color);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .title-class {
        color: var(--text-smooth-color);
        cursor: pointer;
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
        cursor: pointer;
    }

    .showing-icon:hover {
        transform: scale(0.85) rotate(45deg);
    }

    .showing-icon-active {
        transform: scale(0.7) rotate(90deg);
    }

    .white-bar {
        border-top: var(--text-smooth-color) 1px solid;
    }

    .white-bar:hover {
        border-top: var(--text-color) 1px solid;
    }

</style>
