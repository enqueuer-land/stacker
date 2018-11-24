<template>
    <div class="dropdown-component">
        <div :id="id" class="dropdown-menu">
            <div v-for="(item, index) in value" :key="index" @click="(event) => event.stopPropagation()">
                <div v-if="item.divider" class="dropdown-divider"></div>
                <h6 v-else-if="item.header" class="dropdown-header">{{item.name}}</h6>
                <a v-else :class="['dropdown-item', itemClass(item)]" href="#" style="text-decoration: none"
                   @click="itemClicked(item)">{{item.name}}</a>
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
                id: generateId()
            }
        },
        methods: {
            isItemEnabled(item) {
                return !item.isEnabled || item.isEnabled();
            },
            itemClicked(item) {
                const dropdownMenu = $('#' + this.id);
                if (this.isItemEnabled(item)) {
                    item.click(...this.args);
                    dropdownMenu.removeClass('show');
                }
            }
        },
        computed: {
            itemClass() {
                return (item) => {
                    return {
                        disabled: !this.isItemEnabled(item)
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .dropdown-component {

    }

</style>
