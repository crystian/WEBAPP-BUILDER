/**
 * Created by Crystian on 10/16/2014.
 * Migrate from grunt 9/7/2013
 */

//REMEMBER!: All public TASKS ARE ON tasks.js
var gulp = require('gulp');

require('./tasks/boot.js').boot({
  gulp: gulp,
  dirname: __dirname
});

