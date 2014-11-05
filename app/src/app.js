try { var g = window; } catch(e) { g = global; }

(function(global){

  //Where the list of articles will be displayed
  var $items = $('<ul id="#news"></ul>');
  $items.addClass('list-group');
  $('.container-fluid').append($items);

  //Will be moved to a seperated file
  var render = function(article){
    if($items.length >= 10){
      $items.empty();
    }
    var id = article.id;

    var text = [
      { name:'title', value:article.title },
      { name:'summary', value: article.summary }
    ];

    var imgsrc = article.getImgSrc();
    var link = article.link;
    article.$el = App.Elems.buildCard(id,text,imgsrc, link );

    article.$el.find('img').addClass('img-responsive');

    $li = $('<li></li>');
    $li.addClass("list-group-item");
    $items.append(article.$el);
  };

  var url = "http://pipes.yahoo.com/pipes/pipe.run?_id=DqsF_ZG72xGLbes9l7okhQ&_render=json&_callback=";

  //The jsonp callback has to be in the global scope
  //I tacked it onto App, which is fine because it doesn't
  //Need a `this`
  App.callback = function(items){
    var resp = items.value.items.slice(0,10);
    var articles = [];
    resp.forEach(function(obj, i){
      var post = new App.Article();

      post.init(obj);
      articles.push(post);
      post.id = i;
      render(post);
    });

  };


  //Reload the application easily to get updates
  App.load = function(){
    $items.empty();
    App.jloader(url, "App.callback");
  };


  App.load();

})(g);
