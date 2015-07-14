var models = ['./agenda.model','./contact.model','./user.model'];
//var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

exports.initialize = function() {
    //mongoose.plugin(findOrCreate);
    models.forEach(function(model){
        require(model)();
    });
};