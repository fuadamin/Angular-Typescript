$(document).ready(function(){

  $(".baseLayers").addClass("hide_layers");
  $(".sidebar_menu").addClass("hide_menu");
  $(".toggle_menu").addClass("opacity_one");
  $(".dropdown-menu").show();
  $(".informationBlock").hide();

  

  $(".fa-chevron-circle-left").click(function(){
    $(".sidebar_menu").addClass("hide_menu");
    $(".toggle_menu").addClass("opacity_one");
  });
  
  $(".toggle_menu").click(function(){
    $(".sidebar_menu").removeClass("hide_menu");
    $(".toggle_menu").removeClass("opacity_one");
  });
  

  $(".sidebartoggle").click(function(){
    var x = document.getElementById('dropdown-menu');
    var a = document.getElementById('informationBlock');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
        a.style.display = 'none';
        
    }
  });

  $("#item01").click(function(){
    var x = document.getElementById('informationBlock');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
  });

  $('.dropdown-menu').on('click','li', function(){
   $(this).addClass('active').siblings().removeClass('active');
});






  /** //time out and delays not working as expected, 
  function showMenuBarOnHover() { 
    $(".toggle_menu").hover(function(){
      $(".sidebar_menu").removeClass("hide_menu");
      $(".toggle_menu").removeClass("opacity_one");
    });
  }
  // use setTimeout() to execute
  setTimeout(showMenuBarOnHover, 50) 
  */
  	   
	  $(".layersToggle").click(function(){
	    $(".baseLayers").removeClass("hide_layers");
      $(".baseLayers").addClass("hide_layers");
	    $(".layersToggle").removeClass("show_layers");
	  });

    $(".layersToggle").hover(function(){
	    $(".baseLayers").removeClass("hide_layers");
	    $(".layersToggle").removeClass("show_layers");
	  });

  $(".baseLayers").mouseleave(function(){
	    $(".baseLayers").addClass("hide_layers");
	  });





});