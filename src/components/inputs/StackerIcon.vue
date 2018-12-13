<template>
    <div>
        <i class="material-icons stacker-icon"
           @mouseenter="mouseOver = true"
           @mouseleave="mouseOver = false"
           @click="onClick"
           :id="id"
           :style="style"
        >{{name}}</i>
    </div>
</template>
<script>

    import {generateId} from "../../tests/id-generator";

    export default {
        name: 'StackerIcon',
        components: {},
        props: ['value', 'color', 'name', 'tooltip', 'placement', 'disabledColor', 'toggleable'],
        data() {
            this.updateTooltip();
            return {
                id: generateId(),
                toggle: !!this.value,
                mouseOver: false,
            }
        },
        mounted() {
            this.updateTooltip();
        },
        methods: {
            onClick() {
                if (this.toggleable) {
                    this.toggle = !this.toggle;
                }
                this.$emit('click', this.toggle);
                if (this.tooltip) {
                    $(`#${this.id}`).tooltip('hide');
                }
            },
            updateTooltip() {
                if (this.tooltip) {
                    const toolTipProperties = {
                        html: true,
                        placement: this.placement || 'auto',
                        animation: true,
                        delay: {
                            show: 1000,
                            hide: 100
                        },
                        title: this.tooltip,
                        trigger: 'hover'
                    };

                    $(`#${this.id}`).tooltip(toolTipProperties);
                }
            },
        },
        computed: {
            style() {
                const result = {};
                if (this.toggleable) {
                    if (this.toggle) {
                        result.color = this.color;
                        if (!this.mouseOver) {
                            result.transform = 'rotate(0deg) scale(1)';
                        } else {
                            result.transform = 'rotate(10deg) scale(1.4)';
                        }
                    }
                } else if (this.disabledColor) {
                    result.color = this.disabledColor;
                }
                if (this.mouseOver) {
                    result.color = this.color;
                }
                return result;
            }
        },
        watch: {
            value() {
                this.toggle = this.value;
            },
            toggle() {
                this.$emit('input', this.toggle);
            }
        },
    }
</script>

<style scoped>

</style>
