# SupermarketAPI

![alt-text](https://travis-ci.org/trdale/SupermarketAPI.svg?branch=master)

Simple Node, Express, Angular api to demonstrate testing with Mocha, Chai, and Karma with CI implimented through TravisCI.

## Requirements

 * [NodeJs](http://nodejs.org) >= 6.x
 * [Karma-Cli](http://karma-runner.github.io/1.0/intro/installation.html)

## Installing

Install 

```sh
$ git clone https://github.com/trdale/SupermarketAPI.git
$ npm install
```
Can be run on localhost:3000

```sh
$ npm start
```

## API Endpoints

* [GET /api/produce](docs/get_api_produce.md)
* [POST /api/produce](docs/post_api_produce.md)
* [DELETE /api/produce/:name](docs/delete_api_produce_name.md)

## Tests

```sh
$ npm test
```

Test description can be found [here](docs/test_descriptions.md)

## Authors

**Tom Dale**

## License

MIT