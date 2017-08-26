var mongoose = require('mongoose');
var sljwxSchemas = require('../schemas/sljwx');
module.exports = mongoose.model('Sljwx', sljwxSchemas);