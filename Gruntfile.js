module.exports = function (grunt) {
    "use strict";

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('css', ['compass']);
    grunt.registerTask('default', ['compass']);
    grunt.registerTask('nodewkbuild', ['nodewebkit']);


    grunt.initConfig({
        compass: {
            dist: {
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            }
        },
        nodewebkit: {
            build: {
                options: {
                    version: '0.9.2',
                    build_dir: './build', // Where the build version of my node-webkit app is saved
                    mac_icns: './src/app/images/popcorntime.icns', // Path to the Mac icon file
                    mac: true,
                    win: false
                },
                src: ['**', './css/**', './fonts/**', './images/**', './js/**', './node_modules/**', '!./node_modules/grunt*/**', '!./node_modules/bower/**', './Config.rb', './index.html', './package.json', './vendor' ]
            }
        },
        watch: {
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['css'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['index.html'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-node-webkit-builder');
};
