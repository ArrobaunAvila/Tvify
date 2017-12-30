/***
*Module Dependencies  
*/

var $ = require('jquery');

$(document).ready(function() { 

var $tvShowsContainer=$('#app-body').find('.tv-shows');
$tvShowsContainer.on('click','button.like',function(ev) {
  var $this= $(this);
   $this.closest('.tv-show').toggleClass('liked');

     /*
   $this.animate({
    'fontSize': '30px'  forma de agregar animaciones a elementos
   },'fast');
   */

})

   /**
    Function para recorrer el array de shows y reemplazatlos en el html
   */
  function renderShows(shows) {  
    $tvShowsContainer.find('.loader').remove();
    shows.forEach(function(show) {
            var articule = template
         .replace(':name:'  ,show.name)
         .replace(':img:' ,show.image.medium)
         .replace(':summary:' ,show.summary)
         .replace(':img alt:' ,show.name + "Logo")
    
          var $article = $(articule) 
           $article.hide();
          $tvShowsContainer.append($article.fadeIn(2500)); 
          //Modificamos el DOM y añadimos los shows  
          }); 
  }


  /**
  Submit search form 
  */
$('#app-body')    
 .find('form')
 .submit(function(ev) {  //hacer un evento cuando se haga submit
   ev.preventDefault(); //Quitar que al hacer submit la pagina se recargue

    var searchtext = $(this)
   .find('input[type="text"]') 
   .val();
   //console.log(searchtext); //mostrar el texto que introducimos en el input[type="text"]
  
   $tvShowsContainer.find('.tv-show').remove();
   var $loader= $('<div class="loader">');
   $loader.appendTo($tvShowsContainer);
   $.ajax({
     url: 'http://api.tvmaze.com/search/shows',
     data: { q: searchtext },
     success: function (res, textStatus, xhr) { 
        $loader.remove();
         var shows  = res.map(function (el) {
             return el.show;
          })
         renderShows(shows);
     }

   })
 })
  //variable  string para trata mejor nuestra estructura de los elementos show
 var template='<article class="tv-show">'+
      '<div class="left img-container">'+
        '<img src=":img:" alt=":img alt:">'+
        '</img>'+
      '</div>'+
      '<div class="rigth info">'+  
      '<h1>:name:</h1>'+
     '<p>:summary:</p>'+
     '<button class="like">💚</button>'+
     '</div>'+
    '</article>';
  //Haciendo un request ajax con Jquery utilizando promises en jquery
  if(!localStorage.shows){
    $.ajax('http://api.tvmaze.com/shows') 
      .then(function(shows) {
         $tvShowsContainer.find('.loader').remove();
         localStorage.shows= JSON.stringify(shows);
         renderShows(shows);
     }) 
  } else {
    renderShows(JSON.parse(localStorage.shows));
  } 

})