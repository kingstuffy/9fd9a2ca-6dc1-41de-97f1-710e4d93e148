# Product

* [Summary](#summary)
* [Project Structure](#projcet-structure)
* [Build Project](#build-project)
* [Starting The App](#starting-the-app)
* [Testing](#testing)
* [API Documentation](#api-documentation)

## Summary
Create an app that is a single product page, and allow anyone to submit written reviews along with a 5-star rating


## Project Structure
* This application is built using the SailsJS Framework.
* Mocha is used for testing
* PusherJS is used for real time updates
* Caprover and Docker are used for deployments

## Starting The App
* Create a new `.env` file from the `.env.sample` and update the values
* Make sure that [Node.js](https://nodejs.org/) is installed.
* Install node modules with `yarn` or `npm`
```shell
yarn install
```
* To run the app,
```shell
  yarn start
```
* To run the app locally,
```shell
  yarn dev
```
* Demo: [Product Page](https://gumroad-product-api.apps.stuffmeisters.com)

## Testing
* Tests are written using Cypress.
* Run the test suite using,
```shell
yarn test
```

## API Documentation
* https://documenter.getpostman.com/view/914502/UUxtGBMa
