const gulp = require('gulp'),
  rename = require('gulp-rename'),
  svgSymbols = require('gulp-svg-symbols'),
  sftp = require('gulp-sftp'),
  replace = require('gulp-replace');

const generateSvgSprite = function() {
  return gulp.src('app/assets/svg/*.svg')
    .pipe(svgSymbols({
      svgClassname: 'svg-icons'
    }))
    .pipe(rename(function(path) {
      path.basename = path.basename.replace('symbols', 'icons');
      if (path.extname === '.css')
        path.basename = '_' + path.basename;
    }))
    .pipe(gulp.dest('public/assets/svg'));
};

const replaceIntegrity = function() {
  return gulp.src(['dist/assets/fonts/fonts.css'])
    .pipe(replace('/assets/fonts', '/front/assets/fonts'))
    .pipe(gulp.dest('dist/assets/fonts'));
};

const replaceFontsPaths = function() {
  return gulp.src(['dist/assets/fonts/fonts.css'])
    .pipe(replace('/assets/fonts', '/front/assets/fonts'))
    .pipe(gulp.dest('dist/assets/fonts'));
};

const replaceImagesPaths = function() {
  return gulp.src(['dist/assets/images/images.css'])
    .pipe(replace('/assets/images', '/front/assets/images'))
    .pipe(gulp.dest('dist/assets/images'));
};

const deployBasics = function() {
  return gulp.src('dist/*')
    .pipe(sftp({
        host: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
};

const deployAssetsBasics = function() {
  return gulp.src('dist/assets/*')
    .pipe(sftp({
        host: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
};

const deployAssetsFonts = function() {
  return gulp.src('dist/assets/fonts/*')
    .pipe(sftp({
        host: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
};

const deployAssetsImages = function() {
  return gulp.src('dist/assets/images/*')
    .pipe(sftp({
        host: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
};

const deployAssetsSvg = function() {
  return gulp.src('dist/assets/svg/*')
    .pipe(sftp({
        host: '',
        user: '',
        pass: '',
        remotePath: ''
    }));
};

gulp.task('svg-icons', () => generateSvgSprite());

gulp.task('replaceFontsPaths', () => replaceFontsPaths());
gulp.task('replaceImagesPaths', () => replaceImagesPaths());

gulp.task('deployBasics', () => deployBasics());
gulp.task('deployAssetsBasics', () => deployAssetsBasics());
gulp.task('deployAssetsFonts', () => deployAssetsFonts());
gulp.task('deployAssetsImages', () => deployAssetsImages());
gulp.task('deployAssetsSvg', () => deployAssetsSvg());

gulp.task('deploy', ['replaceFontsPaths', 'replaceImagesPaths', 'deployBasics', 'deployAssetsBasics', 'deployAssetsFonts', 'deployAssetsImages', 'deployAssetsSvg']);

gulp.task('default');
