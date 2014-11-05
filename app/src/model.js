try { var g = window; } catch(e) { g = global; }

(function(global){

  if(global.App === undefined){
    global.App = {};
  }

  //General Storage class
  var Store = function(map){
    this.map = map || null;
  };


  //Allows mapping to the origin structure of the data
  //Or renaming each item
  Store.prototype.init = function(dataObj){
    var map = this.map;
    if(map !== undefined && map !== null){

      //Will only populate map if available
      for(var prop in map){
        var name = map[prop];
        var value = dataObj[prop];

        this[name] = value;
      }
    } else {
      for(var prop in dataObj){
        this[prop] = dataObj[prop];
      }
    }
  };

  global.App.Store = Store;
})(g);

(function(global){
  var Store = global.App.Store;

  var Article = function(){
    var map = {
      "title":"title",
      "description":"summary",
      "media:content":"imginfo",
      "link":"link"
    };
    Store.call(this, map);
  };

  Article.prototype = Object.create(Store.prototype);
  Article.prototype.constructor = Article;
  Article.prototype.getImgSrc = function(){
    return this.imginfo.url;
  };

  global.App.Article = Article;
})(g);
