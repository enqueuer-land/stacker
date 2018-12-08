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
        props: ['value', 'color', 'name', 'tooltip', 'placement'],
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
            updateTooltip() {
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
                } else if (this.mouseOver) {
                    result.color = this.color;
                }
                return result;
            }
        },
        watch: {
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
