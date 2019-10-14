var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var autopunc_status = new Schema({
    date: { type: Date, default: Date.now},
    api: { type: Number, default: 1},
    category: { type:String, default:"REST API"},
    succeed : { type: Boolean, default: true},
    test: { type: Boolean, deault: false},
    sentence: { type: String, default: ""},
    input: { type: String, deault: ""},
    output: { type: String, deault: ""},
    time: { type: Number, default:0}
});

module.exports = mongoose.model('restore_history', autopunc_status, 'restore_history')