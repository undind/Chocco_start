const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require("autoprefixer");
const concat = require('gulp-concat');
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync").create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./app/"
    }
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function styles() {
  return gulp
    .src("./app/scss/*.scss")
    .pipe(concat('style.css'))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss([autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
    }), cssnano()]))
    .pipe(gulp.dest('./app/css'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch("./app/scss/**/*", styles);
  gulp.watch('./app/*.html', browserSyncReload);
}

gulp.task('default', gulp.parallel(watchFiles, browserSync));