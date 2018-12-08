<template>
    <div class="togglable-icon">
        <i class="material-icons stacker-icon"
           @mouseenter="mouseOver = true"
           @mouseleave="mouseOver = false"
           @click="toggle = !toggle"
           :id="id"
           :style="style"
        >{{name}}</i>
    </div>
</template>
<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'TogglableIcon',
        components: {},
        props: ['value', 'color', 'name', 'tooltip'],
        data() {
            return {
                id: generateId(),
                toggle: !!this.value,
                mouseOver: false,
            }
        },
        methods: {
            updateTooltip() {
                const toolTipProperties = {
                    html: true,
                    placement: 'auto'
                };

                toolTipProperties.title = this.tooltip;
                $(`#${this.id}`).tooltip(toolTipProperties).tooltip('show');
            },
        },
        computed: {
            style() {
                const result = {};
                if (this.toggle) {
                    result.color = this.color;
                    if (!this.mouseOver) {
                        result.transform = 'rotate(0deg) scale(1)';
                    } else {
                        result.transform = 'rotate(-5deg) scale(1.4)';
                    }
                } else {
                    if (this.mouseOver) {
                        result.color = this.color;
                    }
                }
                return result;
            }
        },
        watch: {
            mouseOver(value) {
                if (value) {
                    this.updateTooltip();
                }
            },
            toggle() {
                console.log(this.tooltip);
                this.$emit('input', this.toggle);
            }
        },
    }
</script>

<style scoped>
    .togglable-icon {

    }

</style>
