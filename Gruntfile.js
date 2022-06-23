module.exports = function (grunt) {
	grunt.initConfig({
		compress: {
			main: {
			  options: {
				archive: 'highlight-and-share.zip'
			  },
			  files: [
				{src: ['highlight-and-share.php'], dest: '/', filter: 'isFile'}, // includes files in path
				{src: ['has-click-to-share.php'], dest: '/', filter: 'isFile'}, // includes files in path
				{src: ['readme.txt'], dest: '/', filter: 'isFile'}, // includes files in path
				{src: ['uninstall.txt'], dest: '/', filter: 'isFile'}, // includes files in path
				{src: ['css/**'], dest: '/'}, // includes files in path and its subdirs
				{src: ['dist/**'], dest: '/'}, // includes files in path and its subdirs
				{src: ['img/**'], dest: '/'}, // includes files in path and its subdirs
				{src: ['js/**'], dest: '/'}, // includes files in path and its subdirs
				{src: ['languages/**'], dest: '/'}, // includes files in path and its subdirs
			  ]
			}
		  }
	  });
	  grunt.registerTask('default', ["compress"]);

 
 
	grunt.loadNpmTasks( 'grunt-contrib-compress' );
   
 };
