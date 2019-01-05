/*
Configuration Script
1) Using process.env.NODE_ENV
*/

var environments = {};

environments.staging= {
  'httpport'    : 3000,
  'httpsport'   : 3001,
  'envName'     : 'Stage'
}

environments.production = {
  'httpport'    : 5000,
  'httpsport'   : 5001,
  'envName'     : 'Prod'
}

//check current NODE_ENV input
console.log(process.env.NODE_ENV);
currentEnv = typeof(process.env.NODE_ENV)=='string' ? process.env.NODE_ENV.toLowerCase() : '';
//set your environment variable
console.log(currentEnv);
envToExport = typeof(environments[currentEnv])=='object' ? environments[currentEnv] :environments.staging;
console.log(currentEnv);
//Export only required object
module.exports = envToExport;
