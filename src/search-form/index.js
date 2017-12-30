/**
* Module Dependencies
*/

import $ from 'jquery'
import page from 'page'

$('#app-body')    
 .find('form')
 .submit(function(ev) { 
   ev.preventDefault(); 

       var searchtext = $(this)
   .find('input[type="text"]') 
   .val();

     page(`/search?q=${searchtext}`)
 
 })

