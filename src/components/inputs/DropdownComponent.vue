<template>
    <div class="dropdown-component">
        <div :id="id" class="dropdown-menu">
            <div v-for="(item, index) in value" :key="index"
                 @click="(event) => event.stopPropagation()"
                 @mouseenter="mouseOverIndex = index"
                 @mouseleave="mouseOverIndex = null">
                <div v-if="item.divider" class="dropdown-divider"></div>
                <h6 v-else-if="item.header" class="dropdown-header">{{item.name}}</h6>
                <div v-else class="container dropdown-item" style="cursor:pointer;" @click="itemClicked(item)">
                    <div class="row justify-content-between">
                        <div class="col">{{item.name}}</div>
                        <i v-if="item.icon" :id="id + index"
                           class="col-md-auto pr-0 align-self-center material-icons stacker-icon">{{item.icon}}</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'DropdownComponent',
        components: {},
        props: {
            'value': {},
            'args': {
                default() {
                    return [];
                }
            },
        },
        data() {
            return {
                id: generateId(),
                mouseOverIndex: null
            }
        },
        methods: {
            itemClicked(item) {
                const dropdownMenu = $('#' + this.id);
                item.click(...this.args);
                dropdownMenu.removeClass('show');
            }
        },
        watch: {
            mouseOverIndex(mouseOverIndex) {
                this.value.forEach((_, index) => {
                    const iconElement = $(`#${this.id + index}`);
                    if (mouseOverIndex === index) {
                        iconElement.addClass('hover');
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

</style>
