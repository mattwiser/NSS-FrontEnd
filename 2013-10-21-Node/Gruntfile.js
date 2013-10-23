module.exports = function(grunt) {

  //Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    qunit: { //task
          master: { //target
            options:{
              urls:["http://localhost:3333/tests/master.html"]
            }
      }
    },
    concat: {
      options: {

      },
      dist: {
        src: ["public/js/app/*.js"],
        dest: ["_.build/concat.js"]
      }
    },

    connect: {
      server: {
        options: {
          port: 3333,
          hostname:"localhost",
          base:"public"
        }
      }
    },

    watch: {
      js: {
        files: ["public/js/app/**/*.js"],
        tasks: ["tests"],
        options: {nospawn:true}
      },

    tests: {
      files:["public/tests/**/*.html", "public/js/tests/**/*.js"],
      tasks: ["qunit"],
      options: {nospawn:true}
  }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("tests", ["qunit"]);

  grunt.registerTask("default", ["qunit"]);

};