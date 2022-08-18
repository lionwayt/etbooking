module.exports = grunt;

var fs = require('fs')
  , util = require('util')
  , path = require('path')

function grunt(grunt) {
	grunt.loadNpmTasks('grunt-css');

	grunt.registerTask('build-test', 'Builds the test file', function() {
		var template = fs.readFileSync(path.join(__dirname, 'test/browser.mustache'), 'utf8')
		  , specFilter = /\.spec\.js$/
		  , files = []
		  , scripts
		  , html

		grunt.file.recurse(
			path.join(__dirname, 'test'),
			function(abspath, rootdir, subdir, filename) {
				if(!specFilter.test(filename)) {
					return;
				}

				files.push(util.format('%s/%s', subdir, filename));
			}
		);

		scripts = files
			.map(function(file) {
				return util.format('<script src=%s></script>', file);
			})
			.join('\n')
		html = template.replace('{{{scripts}}}', scripts)
		fs.writeFileSync(path.join(__dirname, 'test/browser.html'), html);

		grunt.log.writeln(
			util.format('Wrote browser.html, and linked to %s spec files.'
				, files.length));
	});

	grunt.initConfig({
		cssmin: {
			css: {
				src: 'src/dp.css',
				dest: 'src/dp.min.css'
			}
		},
		min: {
			js: {
				src: 'src/dp.js',
				dest: 'src/dp.min.js'
			}
		}
	});

	grunt.registerTask('default', 'min cssmin build-test');
};
