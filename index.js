/**
 * Extract script tags from html file and return an array of
 * the src-attributes
 */

'use strict';

var fs = require('fs');

/*
   * <!-- extract:<type>[:target] [output] -->
   * - type (required) js, css
   * - target|attribute i.e. dev, release or [href] [src]
   * - output (optional) i.e. script.min.js
*/
var regextract = /<!--\s*extract:(\[?[\w-]+\]?)(?::(\w+))?(?:\s*([^\s]+)\s*-->)*/;
// <!-- /extract -->
var regend = /(?:<!--\s*)*\/extract\s*-->/;
//<script src=""></script>
var SCRIPT_RE = /<script(.*)? src="(.*)"><\/script>/g;
//	<link rel="stylesheet" href="css/base.css">
var LINK_RE = /<link(.*)? href="(.*)">/g;


module.exports = function (htmlFile, prefix) {
	prefix = prefix || '';
	var html = fs.readFileSync(htmlFile, 'utf8');
	
	// normalize line endings and split in lines
	var lines = html.replace(/\r\n/g, '\n').split(/\n/);
	
	//start the array we're sending back out
	var sections = [];
	var inside = false;

	//lets collect all the sections we wrapped in the HTML
	lines.forEach(function (line) {

		var extract = line.match(regextract);
    	var endextract = regend.test(line);
    	var attr;

    	//if we are at the extract block start
    	if(extract)
    	{
    		inside = true;
    		attr = extract[1].match(/(?:\[([\w-]+)\])*/)[1];
    		block = {
		        type: attr ? 'attr': extract[1],
		        attr: attr,
		        target: extract[2],
		        output: extract[3],
		        indent: /^\s*/.exec(line)[0],
		        srcs: []
		    };
    	}

    	//if we're inside and block exists
    	if (inside && block) {
    		var src = "";
    		switch(block.type)
    		{
    			case 'attr' : //not what we're after
    			break;
    			case 'js'	: //src is king
    				src = prefix + line.split(SCRIPT_RE)[2];
    			break;
    			case 'css'	: //href is king
    			break;
    		}
      		block.srcs.push(src);
    	}

    	//if we were inside and now we're at the end of an extract block
    	if (inside && endextract) {
			inside = false;
			sections.push(block);
		}

	});

	return sections;
};
module.exports.pattern = SCRIPT_RE;

