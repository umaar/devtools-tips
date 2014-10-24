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
			vid.pause();
		},
		play: function(vid) {
			vid.currentTime = 0;
			vid.play();
		}
	};

	function toggleVideos(state) {
		videos.each(function() {
			videoPlayback[state]($(this)[0]);
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

	function scrollToTip() {
		var hash = location.hash;
		if (hash.length) {
			var tip = $('.tips-heading [href='+hash+']');
			$('html, body').animate({
			    scrollTop: tip.offset().top
			}, 100);
		}
	}

	function tipsReady(data) {
		videos = $('video');
		bindControls();
		scrollToTip();
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

	function formatData(data) {
		var keyed = data.map(function(tip) {
			tip['key'] = tip.src.replace('media', '').replace('/', '-').replace('.mp4', '');
			return tip;
		});
		return group(keyed);
	}

	function getMedia() {
		return $.getJSON( "media/media.json");
	}

	function getTemplate(data) {
		return $.get('tip.mustache');
	}

	function render(data, template) {
		var rendered = Mustache.render(template, {data: formatData(data)});
		$('.tips').append(rendered);
	}

	$.when(getMedia(), getTemplate()).done(function(data, template) {
		render(data[0], template[0]);
		tipsReady();
	});
});