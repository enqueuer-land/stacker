<template>
    <div class="stage-events p-0" style="position: relative; top: calc(100% - 135px)"
         id="stage-event-group-parent">
        <div class="row justify-content-end mb-0">
            <button v-for="(event, index) in events"
                    :key="index"
                    class="btn event-item py-1 pr-1"
                    type="button"
                    data-toggle="collapse"
                    :style="buttonStyle(index)"
                    @click="selectIndex(index)"
                    :id="event.name + 'Button'"
                    :data-target="'#' + event.name + 'Body'">
                {{event.label}}
                <i class="material-icons button-icon">keyboard_arrow_up</i>
            </button>
        </div>
        <div v-for="event in events" :key="event.name" class="collapse event-body row" :id="event.name + 'Body'"
             :style="cardBodyStyle"
             data-parent="#stage-event-group-parent">
            <div class="card card-body px-2"
                 :style="eventStyle">
                <event v-model="item[event.name]" :eventName="event.name"></event>
            </div>
        </div>
        <div v-show="selectedIndex !== null" class="row" style="height: 100vh; opacity: .5; background-color: black"></div>
    </div>
</template>

<script>

    import Event from "./Event";

    export default {
        name: 'StageEvents',
        components: {Event},
        props: ['item', 'events', 'color'],
        data: function () {
            (this.events || []).forEach(event => this.item[event.name] = this.item[event.name] || {});
            return {
                selectedIndex: null
            }
        },
        methods: {
            getContent: function () {
                this.selectedIndex = null;

                (this.events || []).map(event => $('#' + event.name + 'Body'))
                    .forEach(item => item.collapse('hide'));

                (this.events || [])
                    .forEach(event => this.item[event.name] = this.item[event.name] || {});

            },
            selectIndex(index) {
                (this.events || [])
                    .forEach(event => $('#' + event.name + 'Button i').removeClass('active'));

                if (this.selectedIndex !== index) {
                    this.selectedIndex = index;
                    $('#' + this.events[index].name + 'Button i').addClass('active');
                } else {
                    this.selectedIndex = null;
                }
            }
        },
        watch: {
            eventName: function () {
                this.getContent();
            },
            item: function () {
                this.getContent();
            },
        },
        computed: {
            buttonStyle() {
                return function (index) {
                    if (this.selectedIndex === index) {
                        return {
                            'color': 'var(--text-color)',
                            'background-color': 'var(--stacker-background-alternative-color)',
                            'border-right': '2px solid ' + this.color,
                            'border-top': '2px solid ' + this.color,
                        };
                    } else {
                        return {
                            'color': this.color,
                            'border-bottom': '2px solid ' + this.color,
                        }
                    }
                };
            },
            eventStyle() {
                return {
                    'background-color': 'var(--stacker-background-alternative-color)',
                    border: 'none',
                    padding: 0,
                    'padding-bottom': '15px',
                }
            },
            cardBodyStyle() {
                return {
                    'border-bottom': '2px solid ' + this.color,
                }
            }
        }
    }
</script>

<style scoped>
    .stage-events {

    }

    .card-body {
        z-index: 5;
    }

    .event-item {
        border-radius: 0;
        border: none;
        background-color: var(--stacker-header-background-color);
    }

    .event-item:hover {
        background-color: var(--stacker-background-alternative-color);
        color: var(--text-color);
    }

    .event-item:focus {
        box-shadow: none;
    }

    .event-body {
        /*transition: none !important;*/
    }

    .button-icon.active {
        transform: scale(0.95) rotate(180deg);
    }

    .button-icon {
        transform: scale(0.75);
        position: relative;
        top: 6px;
        transition: transform 400ms ease
    }

</style>
