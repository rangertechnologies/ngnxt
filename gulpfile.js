var forceDeploy = require('gulp-jsforce-deploy');
var gulp = require('gulp');
var del = require('del');
var zip = require('gulp-zip');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var file = require('gulp-file');
var dotenv = require('dotenv');
dotenv.config();

// define variables from process.env
const pageName = process.env.PAGE_NAME;
const apiVersion = process.env.API_VERSION;
const dev_resources = process.env.DEV_RESOURCE_NAME;
const pkg_resources = process.env.PKG_RESOURCE_NAME;
const baseHref = process.env.BASE_HREF;
const devResources = process.env.DEV_RESOURCES_URL;
const distPath = process.env.DIST_PATH || 'dist/ngNxt';

let controller = process.env.CONTROLLER;
controller = controller ? `controller="${controller}"` : ``;

let extensions = process.env.EXTENSIONS;
extensions = extensions ? `extensions="${extensions}"` : ``;

const otherPageAttrs = `sidebar="false" standardStylesheets="false" showHeader="false"`;

// Here we describe meta.xml files to package
const pageMetaXML = `<?xml version="1.0" encoding="UTF-8"?>
<ApexPage xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>${apiVersion}</apiVersion>
    <availableInTouch>false</availableInTouch>
    <confirmationTokenRequired>false</confirmationTokenRequired>
    <label>${pageName}</label>
</ApexPage>`;

const resourcesMetaXML = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Public</cacheControl>
    <contentType>application/x-zip-compressed</contentType>
</StaticResource>`;

const packageXML = `<?xml version="1.0" encoding="UTF-8"?>
<Package xmlns="http://soap.sforce.com/2006/04/metadata">
    <types>
        <members>*</members>
        <name>StaticResource</name>
    </types>
    <version>${apiVersion}</version>
</Package>`;

// Task to remove package folder
gulp.task('rm', function () { return del(['./package']) });
gulp.task('rmmap', function () { return del(['./dist/ngNxt/*.js.map']) });

gulp.task('create-package', function () {
  return gulp.src('./package', { allowEmpty: true })
  .pipe(file(`package.xml`, packageXML))
    .pipe(gulp.dest('package/'));
});

gulp.task('dev-staticresources', function () {
  return gulp.src('./'+distPath+'/**')
    .pipe(zip(`${dev_resources}.resource`))
    .pipe(file(`${dev_resources}.resource-meta.xml`, resourcesMetaXML))
    .pipe(gulp.dest('package/staticresources/'));
});

gulp.task('pkg-staticresources', function () {
  return gulp.src('./'+distPath+'/**')
    .pipe(zip(`${pkg_resources}.resource`))
    .pipe(file(`${pkg_resources}.resource-meta.xml`, resourcesMetaXML))
    .pipe(gulp.dest('package/staticresources/'));
});

gulp.task('dev-deploy', function () {
  return gulp.src('./package/**', { base: "." })
    .pipe(zip('package.zip'))
    .pipe(forceDeploy({
      username: process.env.DEV_USERNAME,
      password: process.env.DEV_PASSWORD,
      loginUrl: process.env.DEV_URL
    }))
});

gulp.task('pkg-deploy', function () {
  return gulp.src('./package/**', { base: "." })
    .pipe(zip('package.zip'))
    .pipe(forceDeploy({
      username: process.env.PKG_USERNAME,
      password: process.env.PKG_PASSWORD,
      loginUrl: process.env.PKG_URL
    }))
});

gulp.task('build-dev-static', gulp.series('create-package', 'dev-staticresources'))
gulp.task('build-pkg-static', gulp.series('create-package', 'pkg-staticresources'))
