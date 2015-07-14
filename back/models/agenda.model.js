var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var obj = Schema.Types.ObjectId;

module.exports = function() {
    var agendaSchema = new Schema({
        name: {type: String, required:true},
        company: {type: String},
        contacts: [{type: obj, ref: 'Contact'}],
        user: {type: obj, required: true}
    });

    mongoose.model('Agenda', agendaSchema, 'agenda');
};
