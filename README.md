## Stacker

Have you ever struggled with testing multi IPC protocol flows?
Want to ensure that a user journey which involves several steps with different protocols is working properly?
Dependencies messages have become a pain?
Have you ever wondered how awesome it would be to have a GUI tool to save you from this agonizing pain?
Don't you worry anymore. [stacker](https://lopidio.github.io/stacker/) is what you're looking for.

It's ~~not just~~ yet another GUI client tool. It is a superpower (and good looking one) that provides the following capabilities:
- Support for many protocols out of the box
- Easily mock numerous services to alleviate the headaches of functional and integration tests
- Friendly for developers and non developers
- Built in assertion library to verify response data coming from/going to your services
- Built in CLI is easy to add to your team's existing CI pipelines using [enqueuer](https://enqueuer-land.github.io/enqueuer/)
- (WIP) ~~Easily extensible behavior through third party plugins, including your own custom ones~~ 

------

#### Test driven client
Assertions are the main reason to use this. Check whether each flowing by message matches what is expected:

- Sent to where it was suppose to be sent
- Contains what it should contain
- Sent faster than the threshold

#### Multi-protocol client
Have you seen how many protocols it supports? Incredible, huh? Out of the box, just one click away from each other.

- HTTP
- AMQP
- MQTT

