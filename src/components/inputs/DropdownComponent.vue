<template>
    <div class="dropdown-component">
        <div :id="id" class="dropdown-menu">
            <div v-for="(item, index) in value" :key="index"
                 :id="id + index"
                 @click="(event) => event.stopPropagation()"
                 @mouseenter="mouseOverIndex = index"
                 @mouseleave="mouseOverIndex = null">
                <div v-if="item.divider" class="dropdown-divider"></div>
                <h6 v-else-if="item.header" class="dropdown-header">{{item.name}}</h6>
                <div v-else :class="['container dropdown-item', nameClass(item)]" style="cursor:pointer;"
                     @click="itemClicked(item)">
                    <div class="row justify-content-between">
                        <div class="col">{{item.name}}</div>
                        <div v-if="item.icon" class="col-md-auto pr-0 align-self-center">
                            <stacker-icon v-if="item.toggle"
                                          :name="item.icon"
                                          :color="item.toggle && item.toggle.color ? item.toggle.color : null"
                                          :toggleable="item.toggle"
                                          v-model="args.item[item.toggle.name]"
                                          :disabled-color="item.toggle && item.toggle.disabledColor ? item.toggle.disabledColor : null">
                            </stacker-icon>
                            <stacker-icon v-else
                                          :name="item.icon">
                            </stacker-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {generateId} from "../../tests/id-generator";
    import StackerIcon from "./StackerIcon";

    export default {
        name: 'DropdownComponent',
        components: {StackerIcon},
        props: {
            'value': {},
            'args': {}
        },
        mounted() {
            // this.value.forEach((item, index) => {
            //     console.log('before mount: ' + this.isItemEnabled(this.value[index]));
            //     const dropdownItem = $(`#${this.id + index} .dropdown-item`);
            //     if (!this.isItemEnabled(this.value[index])) {
            //         dropdownItem.addClass('dropdown-item-disabled');
            //     }
            // });
        },
        data() {
            return {
                id: generateId(),
                mouseOverIndex: null
            }
        },
        methods: {
            // isItemEnabled(item) {
            //     // console.log(JSON.stringify(item) + ' => ' + item.isEnabled(...this.args));
            //     return item.isEnabled === undefined || item.isEnabled(...this.args);
            //
            // },
            itemClicked(item) {
                const dropdownMenu = $('#' + this.id);
                // if (this.isItemEnabled(item)) {
                item.click(this.args);
                dropdownMenu.removeClass('show');
                // }
            }
        },
        computed: {
            model() {
                return function(item) {
                    if (item.toggle && this.args.item) {
                        // let model = this.args.item[item.toggle.name];
                        if (this.args.item[item.toggle.name] === undefined) {
                            this.args.item[item.toggle.name] = false;
                        }
                        return this.args.item[item.toggle.name];
                    }
                    return null;
                }
            },
            nameClass() {
                return function (item) {
                    return {
                        'dropdown-item-active': item.toggle && this.args.item && this.args.item[item.toggle.name]
                    }
                }
            },
        },
        watch: {
            mouseOverIndex(mouseOverIndex) {
                this.value.forEach((_, index) => {
                    const iconElement = $(`#${this.id + index} .stacker-icon`);
                    if (mouseOverIndex === index) {
                        // console.log(this.isItemEnabled(this.value[index]));
                        // if (this.isItemEnabled(this.value[index])) {
                        iconElement.addClass('hover');
                        // }
                    } else {
                        iconElement.removeClass('hover');
                    }
                });

            }
        }
    }
</script>

<style scoped>
    .dropdown-component {

    }

    .noHover {
        pointer-events: none;
    }

</style>
