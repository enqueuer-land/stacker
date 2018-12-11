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
                <div v-else class="container dropdown-item" style="cursor:pointer;"
                     @click="itemClicked(item)">
                    <div class="row justify-content-between">
                        <div class="col">{{item.name}}</div>
                        <div v-if="item.icon">
                            <togglable-icon v-if="item.toggle && args.item" :name="item.icon"
                                            v-model="args.item[item.toggle.name]" :color="item.toggle.color"></togglable-icon>
                            <i v-else
                               :class="['col-md-auto pr-0 align-self-center material-icons stacker-icon', dropdownIconClass(item)]">{{item.icon}}</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {generateId} from "../../tests/id-generator";
    import TogglableIcon from "./TogglableIcon";

    export default {
        name: 'DropdownComponent',
        components: {TogglableIcon},
        props: {
            'value': {},
            'args': {}
        },
        updated() {
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
            dropdownIconClass() {
                return function (item) {
                    // console.log('dropdownIconClass');
                    return {
                        // noHover: !this.isItemEnabled(item)
                    }
                }
            }
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
