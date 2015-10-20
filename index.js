var through = require('through2');
var gutil = require('gulp-util');

var PluginError = gutil.PluginError;

// consts
const PLUGIN_NAME = 'package-react';

// plugin level function (dealing with files)
function packageReact() {


  return through.obj(function (file, enc, cb) {

    if (file.isNull()) {
      console.log("FILE IS NULL");
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('package-react', 'Streaming not supported'));
      return;
    }

    try {

      var res =  file.contents.toString();

      var array = res.split("\n");
      var newarr = [];
      var cnt = 0;
      for ( var i=0; i < array.length; i++ ) {
        if ( array[i].indexOf('require') === -1 && array[i].indexOf('strict') === -1 && array[i].indexOf('import') === -1 ) {
          newarr[cnt] = array[i];
          cnt++;
        }
      }

      var newfile = newarr.join("\n");

      file.contents = new Buffer(newfile);
      this.push(file);

    } catch (err) {
      this.emit('error', new gutil.PluginError('package-react', err, {
        fileName: file.path
      }));
    }
    cb();
  });

};

// exporting the plugin main function
module.exports = packageReact;
