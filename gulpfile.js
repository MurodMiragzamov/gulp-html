const { src, dest, series, watch } = require("gulp"),
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
    .pipe(
      htmlmin({
        collapseWhitespace: true,
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

function clear() {
  return del("dist");
}
function serve() {
  sync.init({
    server: "./dist",
  });
  watch("src/**.html", series(html)).on("change", sync.reload);
  watch("src/scss/**.scss", series(scss)).on("change", sync.reload);
}

// exports.html = html;
// exports.scss = scss;
exports.build = series(clear, scss, html);
exports.serve = series(clear, scss, html, serve);
