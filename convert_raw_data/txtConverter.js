"use strict";
var path = require('path');
var fs = require('fs');
// read profiles and led information
var profiles = fs.readFileSync(path.join(__dirname, '/txt/test.txt'));