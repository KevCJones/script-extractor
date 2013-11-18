/* global describe:true, it:true */

'use strict';

var chai = require('chai').should();

var scriptExtractor = require('../index.js');

var expectedCSS = [
	'css/default.css',
	'css/override.css',
	'css/override2.css',
]

var expectedHead = [
	'js/jquery-1.10.2.min.js',
	'js/lib/underscore-min.js',
	'js/lib/raphael-min.js',
	'js/lib/morris-0.4.3.js'
];

var expectedBlock1 = [
	'js/lib/Leaflet/leaflet-src.js',
	'js/lib/Leaflet.draw/leaflet.draw-src.js',
	'js/lib/Polyline.encoded.js',
	'js/geoUtil.js',
];


var allBlocks = [
	expectedCSS,
	expectedHead,
	expectedBlock1
]

describe('script-extractor', function () {
	it('extracts the correct number of section blocks', function () {
		var sections = scriptExtractor(__dirname + '/test.html');
		sections.should.have.length(allBlocks.length);
		allBlocks.should.eql(
			sections.map(function (val) {
				return val.srcs;
			})
		);
	});

	it('extracted the css block ok' ,function() {
		var sections = scriptExtractor(__dirname + '/test.html');
		sections[0].type.should.eql('css');
		sections[0].output.should.eql('styles.head.css');
		sections[0].srcs.should.eql(expectedCSS);

	});

	it('extracted the js in head block ok' ,function() {
		var sections = scriptExtractor(__dirname + '/test.html');
		sections[1].type.should.eql('js');
		sections[1].output.should.eql('head.script.js');
		sections[1].srcs.should.eql(expectedHead);

	});

	it('extracted the js in body block ok' ,function() {
		var sections = scriptExtractor(__dirname + '/test.html');
		sections[2].type.should.eql('js');
		sections[2].output.should.eql('body.script.js');
		sections[2].srcs.should.eql(expectedBlock1);

	});

	it('applies prefixes ok, using the body block', function () {
		var prefix = 'prefix/to/';
		var sections = scriptExtractor(__dirname + '/test.html', prefix);



		sections[2].srcs.should.eql(
			expectedBlock1.map(function (val) {
				return prefix + val;
			})
		);
	});

	it('exposes the patterns', function () {
		scriptExtractor.scriptPattern.should.be.an.instanceof(RegExp);
		scriptExtractor.linkPattern.should.be.an.instanceof(RegExp);
	});
});