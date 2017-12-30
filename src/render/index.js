/*
* Module Dependencies
*/
import $ from 'jquery'
import $tvShowsContainer from 'src/tv-show-container'

var template = `<article class="tv-show">
      <div class="left img-container">
        <img src=":img:" alt=":img alt:">
        </img>
      </div>
      <div class="rigth info">
      <h1>:name:</h1>
     <p>:summary:</p>
     <button class="like">💚</button>
     </div>
    </article>`;

    
 export default function renderShows(shows) {  
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
