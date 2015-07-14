var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var obj = Schema.Types.ObjectId;

module.exports = function() {

    // is_admin: {type: Boolean, default: false},
    var userSchema = new Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required:true},
        email: {type: String, required:true},
        agendas: [{type: obj, ref: 'Agenda'}],
        contacts:  [{type: obj, ref: 'Contact'}]
    });

    mongoose.model('User', userSchema, 'user');
};
