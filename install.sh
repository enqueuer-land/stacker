#!/usr/bin/env bash
#Do not forget to remove enqueuer from package.json dependencies before doing this.

rm -rf node_modules/ package-lock.json && npm install && npm i enqueuer --no-optional
