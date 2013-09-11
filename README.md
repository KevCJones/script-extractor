script-extractor
----------------

Extract the script sources from a html file and pass them to uglify task.

`npm install script-extractor --save-dev`

example `Gruntfile.js`:
```JavaScript
module.exports = function (grunt) {
	'use strict';

	var scriptExtractor = require('script-extractor');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				report: 'min'
			},
			build: {
				files: {
					'dist/app.min.js': scriptExtractor('index.html')
				}
			}
		}
	});
	grunt.loadNpmTask('grunt-contrib-uglify');
	grunt.loadNpmTask('grunt-script-extractor');

	grunt.registertask('default', ['uglify']);
};
```

### `scriptExtractor(htmlFile, [prefix])`
Search through `htmlFile` for script tags and return an array of each script tags `src` value, prefixed by optional `prefix`.
