function popUpVoc(URL) {
	var page;
	page = window.open(URL, 'controlledvocabulary', 'toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=650,height=450');
}



function matchHeights(){

}

function startcarousel() {
	jQuery('div#sidebar-carousel ul li').css({opacity: 0.0});
	jQuery('div#sidebar-carousel ul li:first').css({opacity: 1.0});
	setInterval('rotate()',10000);

}

function rotate() {
	var current = (jQuery('div#sidebar-carousel ul li.show')?  jQuery('div#sidebar-carousel ul li.show') : jQuery('div#sidebar-carousel ul li:first'));
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? jQuery('div#sidebar-carousel ul li:first') :current.next()) : jQuery('div#sidebar-carousel ul li:first'));

	next.css({opacity: 0.0})
	    .addClass('show')
	    .animate({opacity: 1.0}, 1000);

	current.animate({opacity: 0.0}, 1000)
	    .removeClass('show');

}

jQuery(document).ready(function() {
    var links = jQuery('div#aspect_administrative_workflowabort_WorkflowAbortMain_div_search-results').find('a');
    links.attr('target', '_blank');
    startcarousel();
});