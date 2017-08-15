$(document).ready(function(){ //navbar quick links to scroll to a specific section
  $('#aboutLink').click(function(){
     $('html, body').animate({
        scrollTop: $("#topBanner").offset().top
    }, 1000);
  });
  $('#historyLink').click(function(){
     $('html, body').animate({
        scrollTop: $("#historyBanner").offset().top
    }, 1000);
  });
  $('#portfolioLink').click(function(){
     $('html, body').animate({
        scrollTop: $("#portfolioBanner").offset().top
    }, 1000);
  });
  $('#contactLink').click(function(){
     $('html, body').animate({
        scrollTop: $("#contactBanner").offset().top
    }, 1000);
  });
 });