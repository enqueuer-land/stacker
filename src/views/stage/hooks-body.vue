<template>
    <div style="text-align: right" class="carabina-text">
        <b-button-group class="mr-3">
            <b-button
                    v-for="(btn, idx) in events"
                    :key="idx"
                    @click="onClick(idx)"
                    class="pr-1 ml-3"
                    :pressed="btn.state"
                    variant="carabina">
                {{ btn.caption }}
                <i class="fas fa-chevron-down carabina-icon pl-1"></i>
            </b-button>
        </b-button-group>
        <b-collapse id="hook-body" class="carabina-text">
            <label class="pl-3 d-block carabina-text mb-2">Script</label>
            <hook-script :code="currentScript" @change="value => onChange(value)"
                         class="px-3"></hook-script>
            <div class="bottom-line py-2 mx-2"></div>
        </b-collapse>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import HookScript from '@/inputs/hook-script'

    export default Vue.extend({
        name: 'HooksBody',
        components: {
            HookScript
        },
        props: {
            hooks: Array,
            component: Object
        },
        data: function () {
            return this.initFromProps();
        },
        watch: {
            hooks: function () {
                const reset = this.initFromProps();
                this.expanded = reset.expanded;
                this.events = reset.events;
            },
            expanded: function (value) {
                if (value === this.expanded) {
                    this.$root.$emit('bv::toggle::collapse', 'hook-body')
                }
            }
        },
        computed: {
            currentScript: function () {
                const selectedEvent = this.getSelectedEvent();
                if (selectedEvent) {
                    return selectedEvent.script;
                }
                return '';
            }
        },
        methods: {
            initFromProps: function () {
                return {
                    expanded: false,
                    events: this.hooks.map(hook => ({
                        caption: hook,
                        state: false,
                        script: this.component[hook].script
                    }))
                }
            },
            onChange: function (value) {
                const selectedHook = this.getSelectedEvent();
                if (selectedHook) {
                    selectedHook.script = value;
                    this.$parent.updateAttribute(selectedHook.caption, {script: selectedHook.script});
                }
            },
            getSelectedEvent: function () {
                return this.events.find(btn => btn.state);
            },
            onClick: function (idx) {
                const icons = Array.from(document.querySelectorAll('.carabina-icon'));
                const prevState = this.events[idx].state;
                this.events.forEach((button, index) => {
                    button.state = false;
                    icons[index].classList.remove('active');
                });
                this.events[idx].state = !prevState;
                icons[idx].classList.toggle('active');
                this.expanded = this.events.some(btn => btn.state);
            }
        }
    });
</script>

<style scoped>
    #hook-body {
        background-color: var(--carabina-body-background-darker-color);
        color: red;
    }

    .btn-carabina {
        border: none;
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
        color: var(--carabina-text-darker-color);
        background-color: var(--carabina-header-background-darker-color);
    }

    .btn-carabina:hover {
        color: var(--carabina-text-color);
    }

    .btn-carabina:active, .btn-carabina:focus {
        outline: none !important;
        box-shadow: none !important;
    }

    .btn-carabina.active {
        color: var(--carabina-text-color);
    }

    .carabina-icon {
        font-size: 12px;
        color: var(--carabina-text-darker-color);
        visibility: hidden;
        transition: all ease 0ms;
    }

    button:hover .carabina-icon {
        visibility: visible;
    }

    button.active .carabina-icon {
        visibility: visible;
        transform: scaleY(-1);
    }

    button.active:hover .carabina-icon {
        visibility: visible;
        transform: scaleY(-1) scale(1.25);
    }

    .bottom-line {
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
    }

</style>
