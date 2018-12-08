<template>
    <div class="assertion">
        <div class="row mt-1 mb-0 mx-0"
             data-toggle="collapse" :data-target="'#' + id"
             @click="headerClick">

            <div class="col-4 pl-1 row no-gutters">
                <div class="stacker-label title-class col-md-auto">
                    {{showValues ? 'Name' : name}}
                </div>
                <i class="col-md-auto pl-0 material-icons showing-icon" :id="id + 'ShowingIcon'">keyboard_arrow_right</i>
            </div>
            <div v-if="!showValues" class="col white-bar"></div>
        </div>
        <div :id="id" class="collapse">
            <div class="row pb-2 mx-0">
                <input v-model="name" type="text" class="form-control input-class stacker-input" style="height: 32px">
            </div>
            <div class="input-group input-group-sm mb-1 ml-0 mr-0">
                <div class="input-group-append" style="font-size: 0.8em">
                    <button class="btn dropdown-toggle button-label-class" type="button" data-toggle="dropdown">
                        {{possibleAssertions[currentAssertionIndex].label}}
                    </button>
                    <div class="dropdown-menu">
                        <div style="cursor :pointer;" class="dropdown-item"
                             v-for="(assertion, index) in possibleAssertions"
                             :key="index"
                             @click="currentAssertionIndex = index">{{assertion.label}}
                        </div>
                    </div>
                </div>
                <input v-model="assertionValue" type="text" class="form-control stacker-input"
                       placeholder="expectation">
                <div v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0"
                     class="input-group-append ml-2"
                     style="font-size: 0.8em">
                    <button class="btn dropdown-toggle button-label-class" type="button" data-toggle="dropdown">
                        {{possibleAssertions[currentAssertionIndex].criteria[currentCriteriaIndex].label}}
                    </button>
                    <div class="dropdown-menu">
                        <div style="cursor :pointer;" class="dropdown-item"
                             v-for="(criterium, index) in possibleAssertions[currentAssertionIndex].criteria"
                             :key="index"
                             @click="currentCriteriaIndex = index"
                        >{{criterium.label}}
                        </div>
                    </div>
                </div>
                <input v-if="possibleAssertions[currentAssertionIndex].criteria && possibleAssertions[currentAssertionIndex].criteria.length > 0"
                       type="text"
                       placeholder="condition"
                       class="form-control stacker-input"
                       v-model="criteriumValue">
            </div>
        </div>

    </div>
</template>

<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'Assertion',
        components: {},
        props: {
            value: {}
        },
        data: function () {
            const initialContent = this.getContent();
            return {
                id: generateId(),
                showValues: false,
                name: initialContent.name,
                currentAssertionIndex: initialContent.currentAssertionIndex,
                currentCriteriaIndex: initialContent.currentCriteriaIndex,
                assertionValue: initialContent.assertionValue,
                criteriumValue: initialContent.criteriumValue,
                possibleAssertions: this.$store.state.assertions || []
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
                const value = this.value || {};
                const content = {
                    name: value.name || '',
                    currentAssertionIndex: 0,
                    currentCriteriaIndex: 0,
                    assertionValue: '',
                    criteriumValue: '',
                    possibleAssertions: this.$store.state.assertions || []
                };
                Object.keys(value).forEach(key => {
                    content.possibleAssertions.forEach((possible, index) => {
                        if (possible.name === key) {
                            content.currentAssertionIndex = index;
                            content.assertionValue = value[key];
                            (possible.criteria || []).forEach((criterium, criteriumIndex) => {
                                Object.keys(value || {}).forEach((remainingKey) => {
                                    if (criterium.name === remainingKey) {
                                        content.currentCriteriaIndex = criteriumIndex;
                                        content.criteriumValue = value[remainingKey];
                                    }
                                });
                            })
                        }
                    });
                });
                return content;
            },
            emitChanges: function () {
                let assertion = {
                    name: this.name
                };
                let currentAssertion = this.possibleAssertions[this.currentAssertionIndex];
                assertion[currentAssertion.name] = this.assertionValue;
                if (currentAssertion.criteria && currentAssertion.criteria.length > 0) {
                    assertion[currentAssertion.criteria[this.currentCriteriaIndex].name] = this.criteriumValue;
                }
                this.$emit('input', assertion);
            }
        },
        watch: {
            name() {
                this.emitChanges();
            },
            currentAssertionIndex() {
                this.emitChanges();
            },
            currentCriteriaIndex() {
                this.emitChanges();
            },
            assertionValue() {
                this.emitChanges();
            },
            criteriumValue() {
                this.emitChanges();
            },
            value() {
                const initialContent = this.getContent();
                this.currentAssertionIndex = initialContent.currentAssertionIndex;
                this.currentCriteriaIndex = initialContent.currentCriteriaIndex;
                this.assertionValue = initialContent.assertionValue;
                this.criteriumValue = initialContent.criteriumValue;
            }
        }
    }
</script>

<style scoped>
    .assertion {
        background-color: var(--stacker-header-background-color);
        border-left: 1px solid var(--stacker-background-alternative-color);
        border-top: 1px solid var(--stacker-background-alternative-color);
        border-bottom: 1px solid var(--stacker-background-alternative-color);
    }

    .button-label-class {
        background-color: var(--stacker-background-color);
        color: var(--text-color);
        border-color: var(--text-smooth-color)
    }

    .button-label-class:focus, .button-label-class.focus {
        outline: 0;
        box-shadow: 0 0 15px var(--text-smooth-color);
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
        transform: scale(0.75);
        position: relative;
        top: -2px;
        cursor: pointer;
        transition: transform 50ms ease;
    }

    .showing-icon:hover {
        transform: scale(0.65) rotate(45deg);
        position: relative;
    }

    .showing-icon-active {
        transform: scale(0.6) rotate(90deg);
        position: relative;
    }

    .white-bar {
        border-top: var(--text-smooth-color) 1px solid;
        position: relative;
        top: 10px;
    }

    .white-bar:hover {
        border-top: var(--text-color) 1px solid;
    }
</style>
