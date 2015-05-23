var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync').create();//web服务器2 
var autoprefixer = require('gulp-autoprefixer'); //css加浏览器版本前缀
var sourcemaps = require('gulp-sourcemaps');//css调试map
var imgmin = require('gulp-imagemin');
var reload = browserSync.reload;
var projectName = 'game';

gulp.task('serve',function() {
     browserSync.init({
        server: "./"
    })
    
});
//sass编译
gulp.task('sass', function () {
    return sass(projectName+'/src/scss', { sourcemap: true, style: 'expanded' })
    .pipe(sourcemaps.write())  //sass 调试Map
    .pipe(autoprefixer({
          // browsers: ['last 2 versions', 'ios 6', 'android 4'],
           //for pc
           browsers: ['last 2 versions'],
           cascade: true
    }))
    .pipe(gulp.dest(projectName+'/dist/css'))
    .pipe(browserSync.reload({stream:true}));
});
//html另存为
gulp.task('html', function () {
  gulp.src(projectName+'/src/*.html')
    .pipe(gulp.dest(projectName+'/dist'))
    .pipe(browserSync.reload({stream:true}));
});
//js,fonts,images另存为
gulp.task('js', function () {
  return gulp.src(projectName+'/src/js/*.js')
    .pipe(gulp.dest(projectName+'/dist/js'))
});


gulp.task('copyimages', function () {
  gulp.src(projectName+'/src/images/*.*')
    .pipe(gulp.dest(projectName+'/dist/images'))
    .pipe(browserSync.reload({stream:true}));
});
gulp.task('copyfonts', function () {
  gulp.src(projectName+'/src/fonts/*.*')
    .pipe(gulp.dest(projectName+'/dist/fonts'))
    .pipe(browserSync.reload({stream:true}));
});
//图片压缩
gulp.task('imgmin', function () {
    return gulp.src(projectName+'src/images/*.*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(projectName+'dist/images'));
});
//监听
gulp.task('watch', function () {
    gulp.watch(projectName+'/src/scss/*.scss', ['sass']);
    gulp.watch(projectName+'/src/js/*.js',['js']).on("change", browserSync.reload);
    gulp.watch(projectName+'/src/images/*.*', ['copyimages']);
    gulp.watch(projectName+'/src/fonts/*.*', ['copyfonts']);
    gulp.watch(projectName+'/src/*.html', ['html']);
});

gulp.task('default',['serve','watch'],function(){
  console.log(projectName);

})











