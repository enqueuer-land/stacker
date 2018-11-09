<template>
    <div class="rounded-switch container-fluid">
        <div class="row no-gutters" style="position: relative; top: 4px;">
            <div class="col-2">

                <label class="switch">
                    <input v-model="enabled" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
            <span :class="['col pl-1', enabled ? 'enabled-label' : 'disabled-label']"
                  style="position: relative; top: 2px; left: 4px">
                {{label}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RoundedSwitch',
        props: ['label', 'value'],
        data: function () {
            return {
                enabled: !!this.value
            }
        },
        watch: {
            value: function () {
                this.enabled = !!this.value;
            },
            enabled: function () {
                this.$emit('input', this.enabled);
            }
        },
        computed: {}
    }
</script>

<style scoped>
    .rounded-switch {

    }

    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 45px;
        height: 30px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--failing-test-color);
        /*-webkit-transition: .4s;*/
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 5px;
        background-color: white;
        /*-webkit-transition: .4s;*/
        transition: .4s;
    }

    input:checked + .slider {
        background-color: var(--passing-test-color);
        border: none;
    }

    input:focus + .slider {
        /*box-shadow: 0 0 1px #2196F3;*/
    }

    input:checked + .slider:before {
        /*-webkit-transform: translateX(26px);*/
        /*-ms-transform: translateX(26px);*/
        transform: translateX(18px);
        /*transform: translateX(18px);*/
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
        /*border: 1px solid white;*/
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .enabled-label {
        color: white;
    }

    .disabled-label {
        color: var(--index-color);
    }

</style>
