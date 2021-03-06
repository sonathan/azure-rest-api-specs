// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License in the project root for license information.

'use strict';
var assert = require('assert'),
  utils = require('./util/utils'),
  oav = require('oav');

describe('Azure swagger model validation using x-ms-examples and examples in spec', function () {
  let swaggersToProcess = utils.getFilesChangedInPR();
  // Useful when debugging a test for a particular swagger. 
  // Just update the regex. That will return an array of filtered items.
  // swaggersToProcess = swaggersToProcess.filter(function(item) {
  //   return (item.match(/.*Microsoft.Logic.*2016-06-01.*/ig) !== null);
  // });
  for (const swagger of swaggersToProcess) {
    it(swagger + ' should have valid examples.', async function () {
      try {
        const validationResult = await oav.validateExamples(swagger, null, {consoleLogLevel: 'error'});
        return assert(
          validationResult.validityStatus === true,
          `swagger "${swagger}" contains model validation errors.`);
      } catch (err) {
        console.dir(err, {depth: null, colors: true});
        throw err;
      }
    });
  }
});