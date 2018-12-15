<template>
    <div class="stage-events p-0" style="position: relative; top: calc(100% - 135px)"
         id="stage-event-group-parent">
        <div class="row justify-content-end mb-0">
            <button v-for="(event, index) in events"
                    :key="index"
                    class="btn event-item py-1 px-3"
                    type="button"
                    data-toggle="collapse"
                    :style="buttonStyle(index)"
                    @mouseenter="mouseOverIndex = index"
                    @mouseleave="mouseOverIndex = null"
                    @click="selectIndex(index)"
                    :id="event.name + 'Button'"
                    :data-target="'#' + event.name + 'Body'">
                <i v-show="hasContent(event)" style="transform: scale(0.5); position: relative; top: 5px;"
                   class="material-icons">fiber_manual_record</i>
                <span>
                    {{event.label}}
                </span>
                <i class="material-icons button-icon">keyboard_arrow_up</i>
            </button>
        </div>
        <div v-for="event in events" :key="event.name"
             :id="event.name + 'Body'"
             class="collapse event-body row"
             :style="cardBodyStyle"
             data-parent="#stage-event-group-parent">
            <div class="card card-body px-2 pt-2" :style="eventStyle">
                <event class="scroll-div" style="max-height: calc(80vh - 150px)" v-model="item[event.name]"
                       :eventName="event.name"></event>
            </div>
        </div>
        <div v-show="selectedIndex !== null" class="row"
             @click="modalClick"
             style="height: 100vh; opacity: .75; background-color: var(--stacker-header-background-color)"></div>
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
                selectedIndex: null,
                mouseOverIndex: null
            }
        },
        methods: {
            getContent: function () {
                this.selectedIndex = null;
                (this.events || [])
                    .map(event => $('#' + event.name + 'Body'))
                    .forEach(item => item.collapse('hide'));
                (this.events || [])
                    .forEach(event => this.item[event.name] = this.item[event.name] || {});
                (this.events || [])
                    .forEach(event => $('#' + event.name + 'Button i').removeClass('active'));

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
            },
            modalClick() {
                $(`#${this.events[this.selectedIndex].name}Body.collapse`).collapse('hide');
                (this.events || [])
                    .forEach(event => $('#' + event.name + 'Button i').removeClass('active'));

                this.selectedIndex = null;
            },
        },
        watch: {
            mouseOverIndex(value) {
                this.events.forEach((_, index) => {
                    const arrowElement = $('#' + this.events[index].name + 'Button i');
                    if (value === index) {
                        arrowElement.addClass('hover');
                    } else {
                        arrowElement.removeClass('hover');
                    }
                });
            },
            eventName: function () {
                this.getContent();
            },
            item: function () {
                this.getContent();
            },
        },
        computed: {
            hasContent() {
                return function (button) {
                    const event = this.item[button.name];
                    return Object.keys(event).some(key => {
                        const item = event[key];
                        return item !== undefined && (item.length > 0 || Object.keys(item).length > 0) && item !== '\n';
                    });
                }
            },
            buttonStyle() {
                return function (index) {
                    if (this.selectedIndex === index) {
                        return {
                            'color': 'var(--text-color)',
                            'background-color': 'var(--stacker-background-color)',
                            // 'border-right': '2px solid ' + this.color,
                            'border-top': '2px solid ' + this.color,
                        };
                    } else {
                        return {
                            'font-weight': 'lighter',
                            'color': this.color,
                            // 'border-bottom': '2px solid ' + this.color,
                        }
                    }
                };
            },
            eventStyle() {
                return {
                    'background-color': 'var(--stacker-background-color)',
                    border: 'none',
                    padding: 0,
                    'padding-bottom': '15px',
                }
            },
            cardBodyStyle() {
                return {
                    // 'border-bottom': '2px solid ' + this.color,
                    'border-bottom': '2px solid var(--enqueuer-color)',
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

    .button-icon {
        transform: scale(0.75) rotate(90deg);
        position: relative;
        top: 6px;
        transition: transform 200ms ease
    }

    .button-icon.active {
        transform: scale(0.95) rotate(180deg);
    }

    .button-icon.hover, .button-icon:hover {
        transform: scale(0.8) rotate(135deg);
    }


</style>
