'use strict';

/* eslint-disable no-console */
var chalk = require('chalk');
var ora = require('ora');
var request = require('request-promise-native');

var spinner = ora({
  text: 'Retrieving Bitcoin data...',
  color: 'yellow'
});

function convertBTC() {
  var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
  var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  var url = 'https://api.coindesk.com/v1/bpi/currentprice/' + currency + '.json';

  spinner.start();

  return request(url).then(function (body) {
    spinner.stop();
    return body;
  }).then(function (body) {
    var apiResponse = JSON.parse(body);
    var price = parseFloat(apiResponse.bpi[currency].rate_float).toFixed(2) * amount;
    console.info(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(price));
  }).catch(function (err) {
    spinner.stop();
    console.info(chalk.red('Something wen wrong in the API. Try in a few minutes.'));
    return err;
  });
}

module.exports = convertBTC;
/* eslint-enable no-console */