(function($){
				$(document).ready(function(){
					// add items for bootstrap dropdown's
					$("#mainMenu > li > ul").each(function(){
						$(this).parent("li").addClass('dropdown');
						//$(this).parent().children("a").append(' ', '<span class="caret"></span>');
						$(this).parent().children("a").addClass('dropdown-toggle');
						$(this).parent().children("a").attr("data-toggle","dropdown");
						$(this).addClass('nav-child dropdown-menu');
						//add for multi-level dropdowns
					    $('.parent > ul li.parent').addClass('dropdown-submenu');
					});
					
					if($('#home_flexslider').length>0)
					  {
							$('#home_flexslider').flexslider({
							  slideshowSpeed: 5000,
							  animation: "slide",
							  prevText: "", 
							  nextText: "",
							  directionNav:false,
							  controlNav:true,
							  pauseOnAction: false
							});
					  }
					  
					 if($('#test_flexslider').length>0)
					  {
							$('#test_flexslider').flexslider({
							  slideshowSpeed: 5000,
							  animation: "slide",
							  prevText: "", 
							  nextText: "",
							  directionNav:false,
							  controlNav:true,
							  pauseOnAction: false
							});
					  }
					  
					  if($('#test_flexslider').length>0)
					  {
						
						  $('.slider2').bxSlider({
							slideWidth: 130,
							minSlides: 4,
							maxSlides: 7,
							slideMargin: 0,
							moveSlides: 7,
							auto: true,
						  });
					  }
				});
})(jQuery);