try { var g = window; } catch(e) { g = global; }

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

  //Must seperate these, kept them together originally because
  //they were alike
  elem.$stringData = function(label, val){
    var $sd = $('<div></div>');
    $sd.addClass(label);

    var titleStyle, messageStyle;
    if(label === 'title'){
      messageStyle = '<small><em>'+val+'</em></small>';
      titleStyle = '<h3 class="well" >Story '+ messageStyle +'</h3>';
    } else {
      messageStyle = '<div>'+val+'</div>';
      titleStyle = '<h3>Summary</h3> '+ messageStyle;
    }

    var $title = $(titleStyle);

    //sd is the div for title -> text, summary -> text pairs
    $sd.append($title);
    $sd.prop('hidden', label === 'summary');
    return $sd;
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

  elem.buildCard = function(id, labels, img, link){
    var $top = $('<div></div>');
    $top.attr('id', id);

    var $el = elem.$card();


    //Title, summary, should be in order
    labels.forEach(function(label){
      $el.append(elem.$stringData(label.name, label.value));
    });

    $el.append(elem.$link(link));
    $el.append(elem.$img(img));

    $top.append($el);
    return $top;
  };

})(g);

//A couple events
(function(global){
  if(global.$ === undefined){
    return;
  }

  var elem = global.App.Elems;
  var $oldCard = elem.$card;

  elem.$card = function(){
    var $card = $oldCard();

    //May be a bug here, seem to have to click titles twice
    //Would probably be better to add a class that hides them.
    $card.on('click', '.title', function(e){
      e.preventDefault();

      var $a = $card.find('a');
      var isHidden = $a.prop('hidden');

      $a.prop('hidden', !isHidden);
      $card.find('.summary').prop('hidden', !isHidden);
    });

    return $card;
  };
})(g);
