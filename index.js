
//Include dependencies
var http  = require('http');
var url = require ('url');
var StringDecoder = require('string_decoder').StringDecoder;


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
  //on data stream end call your termination logic
  req.on('end',function(){
    buffer += decoder.end();

   //output logs
  res.end('Hello World \n');
  console.log(buffer);
   //console.log(headers);
   //console.log('-----------------------');
   //console.log(' path requested is path:- ',trimpath,' , method :- ',method,',  query from url is :- ',queryStringObj);
  });

});

server.listen(3000,function(){
console.log('hey i am listening to port 3000');

});
