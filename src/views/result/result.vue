<template>
    <div id="result" style="height: 100%">
        <div style="background-color: var(--carabina-header-background-color); height: var(--carabina-header-size)">
            Result Header
        </div>
        <div style="background-color: var(--carabina-body-background-color); height: var(--carabina-body-size)">
        </div>
        <div style="background-color: var(--carabina-header-background-darker-color); height: var(--carabina-footer-size)">
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default Vue.extend({

        name: 'Result'
    });
</script>
