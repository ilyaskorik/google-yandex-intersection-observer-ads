// Load Grunt
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            lib: {
                src: 'lazy-ads.js',
                dest: 'lazy-ads.min.js'
            }
        },
        watch: {
            js: {
                files: 'lazy-ads.js',
                tasks: ['uglify']
            }
        }
    })
    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-uglify-es')
    grunt.loadNpmTasks('grunt-contrib-watch')

    // Register Grunt tasks
    grunt.registerTask('default', ['build', 'watch'])
    grunt.registerTask('build', ['uglify'])
}
