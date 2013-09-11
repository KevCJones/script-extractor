/**
 *
 */

'use strict'

module.exports = function (grunt) {
	var SCRIPT_RE = /<script .*src="([a-zA-Z0-9\.-_]*)"><\/script>/g;

	return function (htmlFile, prefix) {
		prefix = prefix || '';
		var html = grunt.file.read(htmlFile);

		var scripts = [];
		html.match(SCRIPT_RE).forEach(function (tag) {
			scripts.push(prefix + tag.split(SCRIPT_RE)[1]);
		});
		return scripts;
	};
};
