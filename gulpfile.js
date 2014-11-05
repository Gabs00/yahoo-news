var gulp = require('gulp');
var karma = require('karma').server;
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var zip = require('gulp-zip');

gulp.task('test', function(done){
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun:true
  }, done);

});

gulp.task('lib', function(){
  return gulp.src([
    'app/lib/**/*/bootstrap.min.js',
    'app/lib/**/*/jquery.min.js',
    'app/lib/**/*/react.min.js',
    'app/lib/**/*/jquery.min.map']
    )
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(gulp.dest('widget/assets/js'))
    .pipe(notify({message:'Finished moving lib files'}));
});

gulp.task('css', function(){
  return gulp.src([
    'app/lib/**/*/bootstrap.css',
    'app/lib/**/*/bootstrap.css.map',
    'app/styles/main.css']
    )
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(gulp.dest('widget/assets/js'))
    .pipe(notify({message:'Finished moving lib files'}));
});

gulp.task('watch', function(){

  livereload.listen();

  gulp.watch('app/src/**/*', ['lint']);

});

gulp.task('zip', function(){
  gulp.src('watch/**/*')
    .pipe(zip('yahoonews.wgt'))
    .pipe(gulp.dest('widget'))
    .pipe(notify({message:'finishing zipping wgt file'}));
});

gulp.task('lint', function(){
  return gulp.src('app/src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({message:'Finished linting files'}));
});

gulp.task('dist', function(){
  gulp.start('lint', 'test', 'lib', 'css');
  gulp.src('app/src/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(gulp.dest('widget/assets'))
    .pipe(notify('finished moving src files'));
  gulp.start('zip');
});
