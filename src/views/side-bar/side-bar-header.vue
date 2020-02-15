<template>
    <b-container fluid id="side-bar-header">
        <img src="../../assets/logo.png" class="img img-fluid mr-auto d-block">
    </b-container>
</template>
<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'SideBarHeader'
    });
</script>
<style type="text/css" scoped>
    #side-bar-header {
        background-color: var(--carabina-header-background-darker-color);
    }

    .img {
        width: 50%;
        padding-top: 18px;
    }
</style>
