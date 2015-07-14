var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var obj = Schema.Types.ObjectId;

module.exports = function() {
    // TODO  phoneNumber String or Number?????
    var contactSchema = new Schema({
        name: {type: String, required:true},
        surname: {type: String, required:true},
        phoneNumber: {type: Number, required:true},
        email: {type: String},
        company: {type: String}
    });

    mongoose.model('Contact', contactSchema, 'contact');
};
