/**
 *
 */

'use strict'

var fs = require('fs');

var SCRIPT_RE = /<script(.*)? src="(.*)"><\/script>/g;

module.exports = function (htmlFile, prefix) {
	prefix = prefix || '';
	var html = fs.readFileSync(htmlFile, 'utf8');
	var tags = html.match(SCRIPT_RE);

	var scripts = [];
	tags.forEach(function (tag) {
		scripts.push(prefix + tag.split(SCRIPT_RE)[2]);
	});
	return scripts;
};
module.exports.pattern = SCRIPT_RE;

