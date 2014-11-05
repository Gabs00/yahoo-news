try { var g = window; } catch(e) { g = global; }

(function(global){

  if(global.App === undefined){
    global.App = {};
  }

})(g);
