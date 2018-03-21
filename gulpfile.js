const gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    conventionalChangelog = require('gulp-conventional-changelog'),
    bump = require('gulp-bump'),
    gutil = require('gulp-util'),
    git = require('gulp-git'),
    args = require('yargs').argv;
var gulpFileCwd = __dirname + "/server/angular";

/**
 * @description We parse the json file instead of using require because require caches multiple calls so the version number won't be updated.
 * @returns {any}
 */
function getPackageJsonConfig() {
    return JSON.parse(fs.readFileSync(__dirname + '/package.json', 'utf8'));
}

var packageJSONConfig = getPackageJsonConfig();
/**
 * @description the default task that is run with the command 'gulp'
 * @description concat and minify your js
 */
gulp.task("compress", function () {
    return gulp.src([gulpFileCwd + "/**/*.js"])
        .pipe(uglify().on("error", function (e) {
            console.log(e);
        }))
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest(gulpFileCwd));
});
gulp.task('bump-version', function () {
    /**
     * @description bumpType = major, minor or patch
     */
    var buildType = args.buildType || (packageJSONConfig && packageJSONConfig.buildType) || "patch";
    return gulp.src(['./package.json'])
        .pipe(bump({type: (buildType)}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

gulp.task('changelog', function () {
    return gulp.src('./CHANGELOG.md', {
        buffer: true
    }).pipe(conventionalChangelog({
        preset: 'angular'
    })).pipe(gulp.dest('.'));
});

gulp.task('commit-changes', function () {
    var newVersion = "v" + getPackageJsonConfig().version;
    return gulp.src('.')
        .pipe(git.add())
        .pipe(git.commit(newVersion));
});

gulp.task('push-changes', function () {
    git.push('origin', function (err) {
        if (err) throw err;
    });
});


gulp.task('release', function (callback) {
    runSequence(
        'compress',
        'bump-version',
        'changelog',
        'commit-changes',
        'push-changes',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('RELEASE FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});