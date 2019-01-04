
//Include dependencies
var http  = require('http');
var url = require ('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');


//create your server Request
var server    = http.createServer(function(req,res){
  //console.log(req);
  //console.log(res);

//get the request path
  var parseUrl = url.parse(req.url,true);
  var path     = parseUrl.pathname;
  var trimpath = path.replace(/^\/+|\/+$/g,'');

//get req  http method
  var method = req.method.toLowerCase();
//get Url query String Object
  var queryStringObj = parseUrl.query;
//get request headers
  var headers = req.headers;
// decode the payload and save it
  // create a buffer and decoder object
  var decoder = new StringDecoder('utf-8');
  var buffer = '';
  //on get data stream save payload on buffer
  req.on('data',function(data){
    buffer+=decoder.write(data);
  });
  //on data stream end call your termination logic and process the routing
    req.on('end',function(){
    buffer += decoder.end();
    //choose req router;
    var reqRouter = typeof(router[trimpath])!=='undefined'? router[trimpath] : handlers.notFound;
    console.log(reqRouter);
    var data = {
      'trimpath': trimpath,
      'method' : method,
      'queryStringObj':queryStringObj,
      'headers':headers,
      'payload':buffer
    };
    reqRouter(data,function(statusCode,payload){
          //defaulting the statusCode
        statusCode =typeof(statusCode)=='number'? statusCode :200;
          //defaultig the payload
        payload = typeof(payload) =='object'? payload : {};
         // Stringify the payload into string
        var payloadString = JSON.stringify(payload);
        //set response header content type
        res.setHeader('Content-Type','application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
        console.log('We are sending response ',statusCode, payloadString);
        }) ;
   });
   //output logs

   //console.log(headers);
   //console.log('-----------------------');
   //console.log(' path requested is path:- ',trimpath,' , method :- ',method,',  query from url is :- ',queryStringObj);
});
//define handlers
var handlers={};
handlers.main = function(data,callback){
callback(406,{'name': 'main handler'});
};
//default handler
handlers.notFound = function(data,callback){
callback(404);
};
//create a router
var router = {'main': handlers.main};

server.listen(config.port,function(){
console.log('hey i am listening to port '+ config.port+ 'for '+config.envName);
});
