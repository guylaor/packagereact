# packagereact

A very simple gulp plugin to clean up some es6 code and then package it so it can be used in another project.
This works together with https://github.com/jonkemp/gulp-useref

## Install
```
  npm install package-react
```

## Usage

```js
  var gulp = require('gulp');
  var packReact = require('package-react');
  var useref = require('gulp-useref');


  gulp.task('bundle', function () {
      var assets = useref.assets();

      return gulp.src('/src/bundle.html')
          .pipe(assets)
          .pipe(packReact())
          .pipe(assets.restore())
          .pipe(useref())
          .pipe(gulp.dest('dist'));
  });
```
