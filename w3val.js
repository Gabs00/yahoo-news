var w3cjs = require('w3cjs');

var results = w3cjs.validate({
  file: 'widget/index.html',
  callback: function(res){
    console.log(res);
  }
});
