
var lnStickyNavigation;


$(document).ready(function()
{	
	applyHeader();
	applyNavigation(); 
	applyMailTo();
	applyResize();
	checkHash();
	checkBrowser();
});

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                    
            }
            
        }); 
    
    });
    
});

/* HEADER FUNCTIONS */

function applyHeader()
{
	$('.jumbotron').css({ height: ($(window).height()) +'px' });
	
	lazyLoad($('.jumbotron'));
}	

function lazyLoad(poContainer)
{
	/*var lstrSource   = poContainer.attr('data-src');
	var lstrPosition = poContainer.attr('data-position');

	$('<img>').attr('src', lstrSource).load(function()
	{
		poContainer.css('background-image', 'url("'+ lstrSource +'")');
		poContainer.css('background-position', lstrPosition);
		poContainer.css('-ms-filter', '"progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\')"');
		poContainer.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + lstrSource + '\', sizingMethod=\'scale\'');
	});*/
}

/* NAVIGATION FUNCTIONS */

function applyNavigation()
{
	applyClickEvent();
	applyNavigationFixForPhone();
	applyScrollSpy();
	applyStickyNavigation();
}

function applyClickEvent()
{
	$('a[href*=#]').on('click', function(e)
	{
		e.preventDefault();
		
		if( $( $.attr(this, 'href') ).length > 0 )
		{
			$('html, body').animate(
			{
				scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 400);
		}
		return false;
	});
}

function applyNavigationFixForPhone()
{
	$('.navbar li a').click(function(event) 
	{
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}

function applyScrollSpy()
{
	$('#navbar-example').on('activate.bs.scrollspy', function() 
	{
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}

function applyStickyNavigation()
{
	lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
	$(window).on('scroll', function() 
	{  
		stickyNavigation();  
	});  
	
	stickyNavigation();
}

function stickyNavigation()
{         
	if($(window).scrollTop() > lnStickyNavigation) 
	{   
		$('body').addClass('fixed');  
	} 
	else 
	{  
		$('body').removeClass('fixed');   
	}  
}

/* MAILTO FUNCTION */

function applyMailTo()
{
	$('a[href*=mailto]').on('click', function(e)
	{
		var lstrEmail = $(this).attr('href').replace('mailto:', '');
		
		lstrEmail = lstrEmail.split('').reverse().join('')
		
		$(this).attr('href', 'mailto:' + lstrEmail);
	});
}

/* RESIZE FUNCTION */

function applyResize()
{
	$(window).on('resize', function() 
	{  
		lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
		$('.jumbotron').css({ height: ($(window).height()) +'px' });
	}); 
}

/* HASH FUNCTION */

function checkHash()
{
	lstrHash = window.location.hash.replace('#/', '#');
	
	if($('a[href='+ lstrHash +']').length > 0)
	{
		$('a[href='+ lstrHash +']').trigger('click');
	}
}

/* IE7- FALLBACK FUNCTIONS */

function checkBrowser()
{
	var loBrowserVersion = getBrowserAndVersion();
	
	if(loBrowserVersion.browser == 'Explorer' && loBrowserVersion.version < 8)
	{ 
		$('#upgrade-dialog').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
}

function getBrowserAndVersion() 
{
	var laBrowserData = [{
		string: 		navigator.userAgent,
		subString: 		'MSIE',
		identity: 		'Explorer',
		versionSearch: 	'MSIE'
	}];
	
	return {
		browser: searchString(laBrowserData) || 'Modern Browser',
		version: searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || '0.0'
	};
}

function searchString(paData) 
{
	for(var i = 0; i < paData.length; i++)	
	{
		var lstrDataString 	= paData[i].string;
		var lstrDataProp 	= paData[i].prop;
		
		this.versionSearchString = paData[i].versionSearch || paData[i].identity;
		
		if(lstrDataString) 
		{
			if(lstrDataString.indexOf(paData[i].subString) != -1)
			{
				return paData[i].identity;
			}
		}
		else if(lstrDataProp)
		{
			return paData[i].identity;
		}
	}
}
	
function searchVersion(pstrDataString) 
{
	var lnIndex = pstrDataString.indexOf(this.versionSearchString);
	
	if(lnIndex == -1) 
	{
		return;
	}
	
	return parseFloat(pstrDataString.substring(lnIndex + this.versionSearchString.length + 1));
}	




// typewriter animation
document.addEventListener('DOMContentLoaded',function(event){
	// array with texts to type in typewriter
	var dataText = ["My Portfolio", "Software Engineer", "Visionary", "Contact Me"];
	
	// type one text in the typwriter
	// keeps calling itself until the text is finished
	function typeWriter(text, i, fnCallback) {
	  // check if text isn't finished yet
	  if (i < (text.length)) {
		// add next character to #top
	   document.querySelector("#cursor").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
  
		// wait for a while and call this function again for next character
		setTimeout(function() {
		  typeWriter(text, i + 1, fnCallback)
		}, 250); //this controls speed of the typing and the delay in between
	  }
	  // text finished, call callback if there is a callback function
	  else if (typeof fnCallback == 'function') {
		// call callback after timeout
		setTimeout(fnCallback, 700);
	  }
	}
	// start a typewriter animation for a text in the dataText array
	 function StartTextAnimation(i) {
	   if (typeof dataText[i] == 'undefined'){
		  setTimeout(function() {
			StartTextAnimation(0);
		  }, 1000); //delay for re-typing
	   }
	   // check if dataText[i] exists
	  if (i < dataText[i].length) {
		// text exists! start typewriter animation
	   typeWriter(dataText[i], 0, function(){
		 // after callback (and whole text has been animated), start next text
		 StartTextAnimation(i + 1);
	   });
	  }
	}
	// start the text animation
	StartTextAnimation(0);
  });




//   hamburger menu side bar

const menuIcon = document.querySelector('.hamburger-menu');
const navbarBar = document.querySelector('.navbarBar');

menuIcon.addEventListener('click', () => {
	navbarBar.classList.toggle("change");
});


/////////////////////////////////////////////////// typewriter animation 2
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor")

const textArray = ["Software Engineer", "Visionary", "Graphic Designer", "Developer", "Trailblazer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
	if(charIndex < textArray[textArrayIndex].length){
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingDelay);
	} else {
		cursorSpan.classList.remove("typing");

		setTimeout(erase, newTextDelay);
	}
}

function erase(){
	if(charIndex > 0){
		if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
		typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
		charIndex--;
		setTimeout(erase, erasingDelay);
	} else {
		cursorSpan.classList.remove("typing");
		textArrayIndex++;
		if(textArrayIndex>=textArray.length) textArrayIndex = 0;
		setTimeout(type, typingDelay + 1100);
	}
}

document.addEventListener("DOMContentLoaded", function() {
	if(textArray.length) setTimeout(type, newTextDelay + 250);
});