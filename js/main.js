$(function() {

	$.getJSON( "media/media.json", function(r) {
		console.log( "success" , r);
	}).done(function() {
		console.log( "second success" );
	}).fail(function(e) {
		console.log( "error" , e);
	});

});