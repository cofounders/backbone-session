module.exports = function (grunt) {
  return {
    code: {
      options: grunt.util._.merge({
        node: true,
        browser: true,
        globals: {
          require: true,
          define: true
        }
      }, grunt.file.readJSON('.jshintrc')),
      src: [
        '*.{json,js}',
        'tests/**/*.js'
      ]
    }
  };
};
