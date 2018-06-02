<template>
    <div id="main">
    <p>HTTP</p>

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
    <p>
        <input type="button" name="send" value="Send" v-on:click="callEnqueuer" />
    </p>

    <fieldset>
        <legend>Response</legend>
        <textarea name="response" rows="40" cols="50"  v-model="enqueueResponse"></textarea>
    </fieldset>

    </div>
</template>

<script lang="ts">
import { EnqueuerClient } from "../enqueuer/enqueuer-client";
import { RequisitionModel } from "../enqueuer/models/inputs/requisition-model";
import { RunnableModel } from "../enqueuer/models/inputs/runnable-model";
import { ResultModel } from "../enqueuer/models/outputs/result-model";

let runnable: RunnableModel = {
  runnableVersion: "01.00.00",
  name: "runnableHttp",
  id: "randomIdFixedInRunnable",
  initialDelay: 0,
  runnables: [
    {
      timeout: 30000,
      name: "HttpTitle",
      subscriptions: [
        {
          type: "http-server",
          name: "HttpSubscriptionTitle",
          endpoint: "/enqueuer",
          port: null,
          method: "POST",
          response: {
            status: 200
          },
          timeout: 10000
        }
      ],
      startEvent: {
        publisher: {
          type: "http-client",
          name: "HttpPublisherClientTitle",
          url: "http://localhost:23075/enqueuer",
          method: "POST",
          payload: {
            enqueuer: "virgs"
          },
          headers: {
            "content-type": "application/json"
          }
        }
      }
    }
  ]
};

export default {
  name: "App",
  data() {
    return {
      enqueueResponse: null,
      outputPort: null
    };
  },
  methods: {
    callEnqueuer: function(this) {
      const requisition = runnable.runnables[0] as RequisitionModel;
      requisition.subscriptions[0].port = parseInt(this.outputPort);

      const enqueuer = new EnqueuerClient(runnable);
      enqueuer.on("response", (response: ResultModel) => {
        this.enqueueResponse = JSON.stringify(response, null, 4);
        console.log(`response: ${JSON.stringify(response, null, 4)}`);
      });
      enqueuer.on("exit", (response: number) =>
        console.log(`exit: ${response}`)
      );
      enqueuer.on("error", (response: Error) =>
        console.error(`error: ${response}`)
      );
      enqueuer.on("log", (response: string) => console.log(`log: ${response}`));
      enqueuer.send();
    }
  }
};
</script>

<style lang="css" scoped>
.hello {
  padding-top: 75px;
}
</style>
