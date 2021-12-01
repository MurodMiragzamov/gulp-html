const { src, dest } = require("gulp"),
  sass = require("gulp-sass"),
  csso = require("gulp-csso"),
  include = require("gulp-file-include"),
  htmlmin = require("gulp-htmlmin"),
  del = require("del"),
  concat = require("gulp-concat"),
  autoprefixer = require("gulp-autoprefixer"),
  sync = require("browser-sync").create();

function html() {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(dest("dist"));
}

function scss() {
  return src("src/scss/**.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
      })
    )
    .pipe(csso())
    .pipe(concat("index.css"))
    .pipe(dest("dist"));
}

exports.html = html;
exports.scss = scss;
