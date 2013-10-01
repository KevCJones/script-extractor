/* global describe:true, it:true */

'use strict';

var chai = require('chai').should();

var scriptExtractor = require('../index.js');

var expected = [
	'js/jquery-1.10.2.min.js',
	'js/lib/underscore-min.js',
	'js/lib/raphael-min.js',
	'js/lib/morris-0.4.3.js',
	'js/app.js',
	'js/lib/Leaflet/leaflet-src.js',
	'js/lib/Leaflet.draw/leaflet.draw-src.js',
	'js/lib/Polyline.encoded.js',
	'js/geoUtil.js',
	'js/lib/jquery-1.10.2.min.js',
	'js/lib/jquery.scrollTo.js',
	'js/modal.js',
	'js/CalendarControl.js',
	'js/app.js',
	'js/lib/epiceditor/epiceditor.js',
	'js/editor.js'
];

describe('script-extractor', function () {
	it('extracts the correct src values', function () {
		var scripts = scriptExtractor(__dirname + '/test.html');

		scripts.should.have.length(expected.length);
		scripts.should.eql(expected);
	});

	it('applies prefixes', function () {
		var prefix = '/prefix/to/';
		var scripts = scriptExtractor(__dirname + '/test.html', prefix);

		scripts.should.eql(
			expected.map(function (val) {
				return prefix + val;
			})
		);
	});

	it('exposes the script pattern', function () {
		scriptExtractor.pattern.should.be.an.instanceof(RegExp);
	});
});