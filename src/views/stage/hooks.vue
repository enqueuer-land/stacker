<template>
    <div id="hooks" style="text-align: right" class="carabina-text">
        <b-button-group class="mr-3">
            <b-button
                    v-for="(event, idx) in events"
                    :key="idx"
                    @click="onClick(idx)"
                    class="pr-1 ml-3"
                    :pressed="event.state"
                    variant="carabina">
                <i v-if="eventHasAttribute(event.caption)" class="fas fa-circle carabina-icon pr-1"
                   style="visibility: visible; font-size: 8px"></i>
                {{ event.caption }}
                <i class="fas fa-chevron-down carabina-icon pl-1"></i>
            </b-button>
        </b-button-group>
        <b-collapse :visible="expanded" id="hook-body-collapse">
            <div v-if="selectedEvent">
                <div v-for="(event, idx) in events"
                     :key="idx">
                    <HookBody :component="component[event.caption]"
                              v-if="selectedEvent.index === idx"
                              @change="value => onChange(event.caption, value)"></HookBody>
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script>
    import Vue from 'vue';
    import '@/styles/texts.css'
    import HookBody from '@/views/stage/hook-body'

    export default Vue.extend({
        name: 'Hooks',
        components: {
            HookBody
        },
        props: {
            hooks: Array,
            component: Object
        },
        data: function () {
            return {
                events: this.hooks.map((event, index) => ({caption: event, state: false, index})),
                expanded: false,
            };
        },
        watch: {
            component: function () {
                this.expanded = false;
                this.events = this.hooks.map((event, index) => ({caption: event, state: false, index}));
            },
            expanded: function (value) {
                if (value === this.expanded) {
                    this.$root.$emit('bv::toggle::collapse', 'hook-body-collapse')
                }
            }
        },
        computed: {
            selectedEvent: function () {
                return this.events.find(btn => btn.state);
            },
            eventHasAttribute: function () {
                return function (name) {
                    const componentEvent = this.component[name];
                    if (componentEvent) {
                        const scriptCondition = componentEvent.script !== '';
                        const assertionsCondition = componentEvent.assertions.length > 0 && componentEvent.assertions.some(assertion => Object.values(assertion).length > 0);
                        const storeCondition = Object.keys(componentEvent.store || {}).some(key => key !== '') && Object.keys(componentEvent.store || {}).length > 0;
                        return scriptCondition || assertionsCondition || storeCondition;
                    }
                    return false;
                }
            }
        },
        methods: {
            onChange: function (name, value) {
                this.$parent.updateAttribute(this.selectedEvent.caption, value);
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
    #hooks {
        background-color: var(--carabina-body-background-darker-color);
    }

    .btn-carabina {
        border: none;
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
        border-bottom: 1px solid var(--carabina-header-background-lighter-color);
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

</style>
