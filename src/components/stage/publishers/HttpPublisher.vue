<template>
    <div class="http-publisher container-fluid">
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                URL
            </div>
        </div>
        <div class="row">
            <div class="input-group input-group-sm mb-1 ml-2 mr-2">
                <input type="text" class="form-control" style="background-color: transparent; color: white">
                <div class="input-group-append"  style="font-size: 0.8em">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown">POST</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">GET</a>
                        <a class="dropdown-item" href="#">PUT</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="pl-2 pt-2" style="font-size: 0.8em; color: white">
                Body
            </div>
        </div>
        <div class="row">
            <div class="input-group mb-1 ml-2 mr-2">
                <textarea class="form-control p-1" rows="10" style="background-color: transparent; color: var(--index-color)"></textarea>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'HttpPublisher',
        data: function () {
            return {
                component: this.$store.state.sideBarSelectedItem
            }
        },
        methods: {
        },
        computed: {
        }
    }
</script>

<style scoped>
    .http-publisher {

    }

</style>
