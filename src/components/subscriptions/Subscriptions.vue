<template>
    <div id="enqueuer-output">
    <fieldset>
    <legend>Output</legend>
                <label>Name</label><input type="text" name="output-name" /> <br />
                <label>Timeout</label><input type="text" name="timeout" /> 
                <p>
                    <label>OnMessageReceived</label><br />
                    <textarea name="on-message-received" rows="4" cols="50"></textarea>
                </p>

                <label>Server</label><input type="text" name="server" /> <br />
                <label>Endpoint</label><input type="text" name="endpoint" /> <br />
                <label>Port</label><input type="text" name="port" v-model="outputPort" /> <br />
                <label>Method</label>
                    <select name="output-method">
                        <option value="post">POST</option>
                        <option value="get">GET</option>
                        <option value="put">PUT</option>
                    </select>
     </fieldset>
    </div>
</template>

<script lang="ts">
   export default { name:'EnqueuerOutput' }
</script>
