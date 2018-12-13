<template>
    <div class="side-bar-footer">
        <span class="px-3 information">
            {{info}}
        </span>
    </div>
</template>

<script>

    export default {
        name: 'StageFooter',
        data() {
            this.$store.state.eventEmitter.on('statusInformation', (information) => {
                this.info = `${new Date().toLocaleTimeString()} - ${information}`;
            });

            return {
                info: ""
            }
        },
    }
</script>

<style scoped>
    .side-bar-footer {
        height: 100%;
        border-top: 1px solid var(--stacker-background-alternative-color);
        background-color: var(--stacker-background-color);
    }

    .information {
        color: var(--text-smooth-color);
        font-weight: lighter;
        font-size: 14px;
        position: relative;
        top: 8px;
    }
</style>
