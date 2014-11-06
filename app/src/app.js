try { var g = window; } catch(e) { g = global; }

(function(global){

  //Where the list of articles will be displayed
  var $items = $('#news');
  $('.loading').prop('hidden', true);
  //Will be moved to a seperated file
  var render = function(article){
    if($items.length >= 10){
      $items.empty();
    }
    var id = article.id;

    var title = { name:'title', value:article.title };
    var summary =  { name:'summary', value: article.summary };

    var imgsrc = article.getImgSrc();
    var link = article.link;
    article.element = new App.Entry(id,title, summary, imgsrc, link );

    var $el = article.element.render();

    $items.append($el);

  };

  var url = "http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json&_callback=";

  //The jsonp callback has to be in the global scope
  //I tacked it onto App, which is fine because it doesn't
  //Need a `this`
  App.callback = function(items){
    var resp = items.value.items.slice(0,10);
    resp.forEach(function(obj, i){
      var post = new App.Article();
      if(obj['media:content']){
        if(obj.description.indexOf(obj['media:content'].url) !== -1){
          delete obj['media:content'].url;
        }
      }
      post.init(obj);
      post.id = i;
      render(post);
    });
    App.loading();
  };


  //Reload the application easily to get updates
  App.load = function(){
    $items.empty();
    App.loading();
    App.jloader(url, "App.callback");
  };


  App.load();

})(g);
