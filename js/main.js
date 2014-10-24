$(function() {

	var panels = [
		"elements",
		"network",
		"sources",
		"timeline",
		"profiles",
		"resources",
		"audits",
		"console"
	];

	function group(data) {
		var grouped = [];
		data.forEach(function(tip) {
			var panel = tip.panel;

			var order = panels.indexOf(panel);
			if (grouped[order] === undefined) {
				grouped[order] = {
					panel: panel,
					tips: []
				};
			}
			grouped[order].tips.push(tip);
		});

		return grouped;
	}

	function filterData(data) {
		render(group(data));
	}

	function getMedia() {
		return $.getJSON( "media/media.json");
	}

	function render(data) {
		console.log(data);
		$.get('tip.mustache', function(template) {
			var rendered = Mustache.render(template, {data: data});
			$('.tips').append(rendered);
		});
	}

	getMedia().done(filterData);
});