
(function(){
    var agendaRouter = require('express').Router({mergeParams:true});
    var userModel = require('mongoose').model('User');
    var agendaModel = require('mongoose').model('Agenda');
   var contactModel = require('mongoose').model('Contact');
    var bcrypt = require('bcrypt');
    var config = require('../config');
    var ObjectId = require('mongoose').Types.ObjectId;
    var _ = require('lodash');



    /**
     *  Get all agendas of user
     */
    agendaRouter.get('/', function(req, res, next) {
        userModel
            .findOne({_id: new ObjectId(req.user._id)})
            .populate('agendas')
            .exec(function(err, user) {
                if(err) throw err;
                else {
                    res.status(200).json(user.agendas);
                }
            });
    });

   /**
    *  Get all Contacts of agenda
    */
   agendaRouter.get('/:agenda_id', function(req, res, next) {
      agendaModel
         .findOne({_id: new ObjectId(req.params.agenda_id)})
         .populate('contacts')
         .exec(function(err, agenda) {
            if(err) throw err;
            else {
               res.status(200).json(agenda.contacts);
            }
         });
   });

    /**
     * Create new agenda.
     */
    agendaRouter.post('/', function(req, res, next) {
        var agendaData = req.body;
        console.log(agendaData);
        //agendaData.user = new ObjectId(agendaData.user);
        var agendaDb = new agendaModel(agendaData);
        agendaDb.save(function(err, agenda){
            if(err) {
               console.log(err);
               //throw err;
            }
            else {
                userModel.findOne({_id: new ObjectId(req.user._id)}, function(err, user){
                    if(err) throw err;
                    else if(!user) res.status(404).send("Couldn't find the user");
                    else {
                        user.agendas.push(agenda._id);
                        user.save(function(err, user) {
                            if(err) throw err;
                            else res.status(200).json(agenda.toObject());
                        });
                    }
                })
            }
        });
    });

   /**
    * Add a contact  --> body phoneNumber:Number
    */

    agendaRouter.post('/:agenda_id', function(req, res, next) {
       var agenda_id = req.params.agenda_id;
       var phoneData = req.body.phoneNumber;
       //Find the agenda
       agendaModel.findOne({_id: new ObjectId(agenda_id)}, function (err, agenda) {
          if (err) throw err;
          else if (!agenda) res.status(404).send("Not found");
          else {
             if (agenda.user.toString() === req.user._id) {
                contactModel.findOne({phoneNumber: phoneData}, function (err, contact) {
                   if (err) {
                      res.status(400).send("Error");
                      console.log(err);
                   }
                   else if (!contact) res.status(404).send("Contact Not found");
                   else {
                      Array.prototype.pushUnique = function (item){
                         if(this.indexOf(item) == -1) {
                            //if(jQuery.inArray(item, this) == -1) {
                            this.push(item);
                            return true;
                         }
                         return false;
                      };
                      agenda.contacts.pushUnique(contact._id);
                      agenda.save(function (err, user) {
                         if (err) throw err;
                         else res.status(200).json(agenda.toObject());
                      });
                   }
                });
             }
             else {
                res.status(404).send("User do not have this agenda");
             }
          }
       });
    });

   /**
    * Delete a contact  --> body phoneNumber:Number
    */

   agendaRouter.post('/deleteContact/:agenda_id', function(req, res, next) {
      var agenda_id = req.params.agenda_id;
      var phoneData = req.body.phoneNumber;
      //Find the agenda
      agendaModel.findOne({_id: new ObjectId(agenda_id)}, function (err, agenda) {
         if (err) throw err;
         else if (!agenda) res.status(404).send("Not found");
         else {
            if (agenda.user.toString() === req.user._id) {
               contactModel.findOne({phoneNumber: phoneData}, function (err, contact) {
                  if (err) {
                     res.status(400).send("Error");
                     console.log(err);
                  }
                  else if (!contact) res.status(404).send("Contact Not found");
                  else {
                     agenda.contacts.pull(contact._id);
                     agenda.save(function (err, user) {
                        if (err) throw err;
                        else res.status(200).json(agenda.toObject());
                     });
                  }
               });
            }
            else {
               res.status(404).send("User do not have this agenda");
            }
         }
      });
   });

   agendaRouter.delete('/:agenda_id', function(req, res, next){
        var agenda_id = req.params.agenda_id;
        //Find the agenda
        agendaModel.findOne({_id: new ObjectId(agenda_id)}, function(err, agenda) {
            if(err) throw err;
            else if(!agenda) res.status(404).send("Not found");
            else {
                //Find the user of the agenda
                userModel.findOne({_id: new ObjectId(req.user._id)}, function(err, user) {
                    if(err) throw err;
                    else {
                        //Remove the agenda from the users list
                        _.pull(user.tasks, agenda._id);
                        user.save(function(err, user) {
                            if(err) throw err;
                            //Finally, remove the agenda from database
                            else agenda.remove(function(err){
                                if(err) throw err;
                                else {
                                    res.status(200).send("Deleted correctly");
                                }
                            });
                        });
                    }
                })
            }
        });
    });

    module.exports = agendaRouter;
})();