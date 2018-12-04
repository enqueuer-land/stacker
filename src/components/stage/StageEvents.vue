<template>
    <div class="stage-events container-fluid p-0" style="position: relative; top: calc(100% - 130px);"
         id="stage-event-group-parent">
        <p class="row justify-content-end mb-0">
            <button v-for="(event, index) in events" :key="event.name" class="btn event-item" type="button"
                    :style="tabStyle(index)"
                    data-toggle="collapse"
                    @click="selectIndex(index)"
                    :id="event.name + 'Button'"
                    :data-target="'#' + event.name + 'Body'">{{event.label}}
            </button>
        </p>
        <div>
            <div v-for="event in events" :key="event.name" class="collapse event-body" :id="event.name + 'Body'"
                 data-parent="#stage-event-group-parent">
                <div class="card card-body"
                     style="background-color: var(--stacker-background-color); border: none; padding: 0; height: 100vh">
                    <event v-model="item[event.name]" :eventName="event.name"></event>
                    <div class="row pt-2" :style="{'border-bottom': color + ' 1px solid'}"></div>
                </div>
            </div>
        </div>
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
                if (this.selectedIndex !== index) {
                    this.selectedIndex = index;
                } else {
                    // (this.events || []).
                    //     map(event => $('#' + event.name + 'Body'))
                    //     .forEach(item => item.removeClass('show'));
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
            tabStyle() {
                return function (index) {
                    if (this.selectedIndex === index) {
                        return {
                            'color': 'var(--text-color)',
                            'background-color': 'var(--stacker-background-color)',
                            'border-top': '2px ' + this.color + ' solid',
                            'border-right': '2px ' + this.color + ' solid',
                        };
                    }
                    return {
                        'color': this.color,
                        'border-bottom': '2px ' + this.color + ' solid',
                    }
                };
            },
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
        background-color: var(--stacker-background-color);
        color: var(--text-color);
    }

    .event-item:focus {
        box-shadow: none;
    }

    .collapsing {
        transition-duration: 0s;
    }

</style>
