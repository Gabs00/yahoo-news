//This file will likely be replaced with react
(function(global){

  if(global.App === undefined){
    global.App = {};
  }

  if(global.$ === undefined){
    console.log('jquery not found');
    return;
  }

  $ = global.$;
  var App = global.App;

  var elem = App.Elems = {};
  elem.$card = function(){
    return $('<div class="card"></div>');
  };

  elem.$message = function(label){
    var $el = $('<div></div>');

    $el.addClass(label);

    return $el;
  };

  elem.$title = function(label, message){
    var $el = elem.$message(label);

    var messageStyle = '<small><em>'+message+'</em></small>';
    var titleStyle = '<h3 class="well" >'+ messageStyle +'</h3>';

    var $title = $(titleStyle);

    //sd is the div for title -> text, summary -> text pairs
    $el.append($title);
    return $el;
  };

  elem.$summary = function(label, message){
    var $el = elem.$message(label);

    var messageStyle = '<p>'+message+'</p>';

    var $title = $(messageStyle);

    //sd is the div for title -> text, summary -> text pairs
    $el.append($title);
    $el.prop('hidden', true);
    return $el;
  };



  elem.$link = function(url){
    var $link = $('<a></a>');
    $link.attr('href', url);
    $link.html('Read more ...');
    $link.prop('hidden', true);
    return $link;
  };

  elem.$img = function(url){
    var $img = $('<img></img>');
    $img.attr('src', url);
    return $img;
  };

  elem.buildCard = function(id, title, summary, img, link){
    var $top = $('<div></div>');
    $top.attr('id', id);
    var refs = {
      $top: $top,
      $card: elem.$card(),
      $title: elem.$title(title.name, title.value),
      $summary: elem.$summary(summary.name, summary.value),
      $img: elem.$img(img),
      $link: elem.$link(link)
    };

    //Adding the elements to card
    var $el = refs.$card;

    //Order matters
    ["$title", "$summary", "$img", "$link"].forEach(function(prop){
      $el.append(refs[prop]);
    });

    $top.append($el);

    return refs;
  };

})(window);

//A couple events
(function(global){
  if(global.$ === undefined){
    return;
  }

  var $ = global.$;
  var elem = global.App.Elems;

  //This Object is to as add events onto elements
  //After they have been created
  var Entry = function(id, title, summary, img, link){
    var args = Array.prototype.slice.call(arguments);
    this.elems = elem.buildCard.apply(null, args);
    this.$el = $('<li></li>');
    this.addEvents();
    this.addStyles();
  };

  Entry.prototype = {};

  Entry.prototype.addEvents = function(){
    this.clickHandler();
  };

  Entry.prototype.addStyles = function(){
    //Main element
    this.$el.addClass('list-group-item row');

    //Main sizing
    this.$el.addClass('col-xs-10 col-md-8');

    //Main offset
    this.$el.addClass('col-md-offset-2');

    this.elems.$summary.addClass('lead');
    this.elems.$img.addClass('img-responsive');
  };

  Entry.prototype.clickHandler = function(){

    var $card = this.elems.$card;
    var $summary = this.elems.$summary;
    var $link = this.elems.$link;

    $card.on('click', '.title', function(e){
      $summary.prop('hidden', !$summary.prop('hidden'));
      $link.prop('hidden', !$link.prop('hidden'));
    });
  };

  Entry.prototype.render = function(){
    this.$el.append(this.elems.$top);
    return this.$el;
  };

  global.App.Entry = Entry;

  global.App.loading = function(){
    $('.loading').prop('hidden', !$('.loading').prop('hidden'));
  };

})(window);
