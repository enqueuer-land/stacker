<template>
    <div id="side-bar-footer">
        <img src="../../assets/gui.png" class="img-fluid ml-2 m-1" id="gui-logo">
    </div>
</template>
<script>
    import Vue from 'vue';

    export default Vue.extend({
        name: 'SideBarFooter'
    });
</script>
<style type="text/css" scoped>
    #side-bar-footer {
        background-color: var(--carabina-body-background-darker-color);
        border-top: 1px solid var(--carabina-header-background-lighter-color);
    }

    #gui-logo {
        filter: blur(3);
        opacity: 0;
        height: 75%;
        width: auto;
        transition: all ease 1500ms;
    }

    #gui-logo:hover {
        opacity: 0.75;
    }
</style>
