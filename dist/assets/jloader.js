
try { var g = window; } catch(e) { g = global; }

//Performs JSONP requests
(function(global){

  if(global.App === undefined){
    global.App = {};
  }

  /*
    The two functions below are for when
    jquery is unavailable

    parse tag get the url
  */
  var parseTag = function(tag){
    var url = tag.match(/src\=\"(.+)\"/);
    if(url === null){
      //Nothing to do
      return;
    } else {
      return url[1]; //The match from the regex
    }
  };

  //appends element to dom
  var append = function(elem){
    var url = parseTag(elem);
    if(url){
      var script = document.createElement('script');
      script.src = url;
      document.body.appendChild(script);
    }
  };

  //Checking if jquery is available
  //If not we use our own functions
  var $ = global.$ ||
    function(selector){
      var elem = document.querySelector(selector);
      return {
        append:append
      };
    };

  //url= "http:/etc/?callback="
  var addScript = function(url, cb){
    $('body').append('<script src=\"'+url+cb+'\"></script>');
  };

  //Attach to our namespace for external usage
  global.App.jloader = function(url, callback){
    addScript(url,callback);
  };
})(g);
