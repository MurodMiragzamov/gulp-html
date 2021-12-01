const { src, dest } = require("gulp"),
  sass = require("gulp-sass"),
  csso = require("gulp-csso"),
  include = require("gulp-file-include"),
  htmlmin = require("gulp-htmlmin"),
  del = require("del"),
  sync = require("browser-sync").create();
