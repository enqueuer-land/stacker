<template>
    <div id="enqueuer-input">
    <fieldset>
        <legend>Input</legend>
                <label>Name</label><input type="text" name="input-name" /> <br />
                <label>Initial Delay</label><input type="text" name="initial-delay" /> 
                <p>
                    <label>Payload</label> <br />
                    <textarea name="payload" rows="4" cols="50"></textarea>
                </p>

                <p>
                    <label>Pre-Publishing</label><br />
                    <textarea name="pre-publishing" rows="4" cols="50"></textarea>
                </p>

                <p>
                    <label>Header Key</label><input type="text" name="header-key" /> &nbsp;
                    <label>Header Value</label><input type="text" name="header-value" /> <br />

                    <label>Method</label>
                    <select name="input-method">
                        <option value="post">POST</option>
                        <option value="get">GET</option>
                        <option value="put">PUT</option>
                    </select>
                </p>
        </fieldset>
    </div>
</template>

<script lang="ts">
   export default { name:'EnqueuerInput' }
</script>
