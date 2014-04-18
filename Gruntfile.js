module.exports = function (grunt) {
  require('load-grunt-config')(grunt, {
    configPath: require('path').join(process.cwd(), 'grunt/options')
  });
  grunt.loadTasks('grunt/tasks');
};
