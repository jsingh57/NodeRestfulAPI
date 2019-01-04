/*
Configuration Script
1) Using process.env.NODE_ENV
*/

var environments = {};

environments.staging= {
  'port'    : 3000,
  'envName' : 'Stage'
}

environments.production = {
  'port'    : 5000,
  'envName' : 'Prod'
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
