# Quick-Service

Somewhat template for making node microservices.

## What makes this opinionated?

* [JavaScript Standard Style all the way](https://github.com/feross/standard)
* ES6/ES7 all the way
* [Restify](http://restify.com)
* Build system already done
* [12 Factor as much as possible](http://12factor.net/). This includes a config file that should be kept separate from the repository.
* SSL always, certificates via [Lets Encrypt](https://letsencrypt.org/). Prefer HTTP/2, SPDY

## Quick Start

* Take an empty folder
* Run `npm install @asnea/quick-service`
* Run `node_modules/.bin/quick-service` (on Windows, use `\`)
* You now have a service template ready to go

Optionally, you can edit the `package.json` to include correct details.

## How to use your new service

There will be a `README.MD` file in your created service, which can explain in details the commands you can run, but in general:

* When developing, run `npm run watch`. Your code will be automatically watched and the server restarted when code changes (via `nodemon`)
* If you want to just build and run the server, run `npm run build-and-run`
* If you're built and just want to run the server, `npm start` will work.
* Run `npm run build-production` to build a production package into `build` (**WIP**)
* Other `npm run` commands are in the `package.json`

## Recommended

* `npm install -g`&nbsp;[`standard`](https://github.com/feross/standard)
* `npm install -g`&nbsp;[`eslint-plugin-standard`](https://github.com/xjamundx/eslint-plugin-standard)

##### If you use Sublime

* [SublimeLinter](http://www.sublimelinter.com/en/latest/)
* [SublimeLinter Standard](https://github.com/Flet/SublimeLinter-contrib-standard)

