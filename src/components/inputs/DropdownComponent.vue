<template>
    <div class="dropdown-component">
        <div id="dropdownMenu" class="dropdown-menu">
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
    export default {
        name: 'DropdownComponent',
        components: {},
        props: ['value'],
        methods: {
            isItemEnabled(item) {
                return !item.isEnabled || item.isEnabled();
            },
            itemClicked(item) {
                const dropdownMenu = $('#dropdownMenu');
                if (this.isItemEnabled(item)) {
                    item.click();
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
