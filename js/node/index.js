(function() {
	var fs = require('fs');
	var data = require('media/media.json');
	var mediaFolder = process.cwd() + '/media/';

	function getKey(name) {
		return name.replace.replace('/', '-').replace('.mp4', '');
	}

	var totalSize = data.reduce(function(prev, cur, ind) {
		var file = mediaFolder + cur.src;
		var size = fs.statSync(file)['size'] / 1000000;
		return prev + size;
	}, 0);

	var metadata = {
		totalSize: Math.round(totalSize)
	};

	fs.writeFileSync(mediaFolder + 'metadata.json', JSON.stringify(metadata));


}());