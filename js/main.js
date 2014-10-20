$(function() {

	function getMedia() {
		return $.getJSON( "media/media.json");
	}

	function render(data) {
		$.get('tip.mustache', function(template) {
			var rendered = Mustache.render(template, {tips: data});
			$('.tips').append(rendered);
		});
	}

	getMedia().done(render);

});