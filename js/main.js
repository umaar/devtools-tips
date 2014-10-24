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

	var videos;

	var videoPlayback = {
		stop: function(vid) {
			vid.currentTime = 0;
		},
		play: function(vid) {
			vid.play();
		}
	};

	function toggleVideos(state) {
		videos.each(function() {
			videoPlayback[state]();
		});
	}

	function bindControls() {
		$('.settings-options-play-all').on('click', function() {
			toggleVideos('play');
		});

		$('.settings-options-stop-all').on('click', function() {
			toggleVideos('stop');
		});
	}

	function tipsReady(data) {
		videos = $('video');
		bindControls();
	}

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
		return group(data);
	}

	function getMedia() {
		return $.getJSON( "media/media.json");
	}

	function getTemplate(data) {
		return $.get('tip.mustache');
	}

	function render(data, template) {
		var rendered = Mustache.render(template, {data: filterData(data)});
		$('.tips').append(rendered);
	}

	$.when(getMedia(), getTemplate()).done(function(data, template) {
		render(data[0], template[0]);
		tipsReady();
	});
});