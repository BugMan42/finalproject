
(function(){
    var contactRouter = require('express').Router({mergeParams:true});
    var userModel = require('mongoose').model('User');
    var ObjectId = require('mongoose').Types.ObjectId;
    var bcrypt = require('bcrypt');
    var contactModel = require('mongoose').model('Contact');
    var config = require('../config');
    var _ = require('lodash');



    /**
    *  Get all users
    */
    contactRouter.get('/', function(req, res, next) {
        userModel
            .findOne({_id: new ObjectId(req.user._id)})
            .populate('contacts')
            .exec(function(err, user) {
                if(err) throw err;
                else {
                    res.status(200).json(user.contacts);
                }
            });
    });

    /**
     * Create new contact.
     */
    contactRouter.post('/', function(req, res, next) {
        var contactData = req.body;
        var contactDb = new contactModel(contactData);
        contactDb.save(function(err, contact){
            if(err) throw err;
            else {
                userModel.findOne({_id: new ObjectId(req.user._id)}, function(err, user){
                    if(err) throw err;
                    else if(!user) res.status(404).send("Couldn't find the user");
                    else {
                        user.contacts.push(contact._id);
                        user.save(function(err, user) {
                            if(err) throw err;
                            else res.status(200).json(contact.toObject());
                        });
                    }
                })
            }
        });
    });

    /**
     * Function to modify the contact
     */
    contactRouter.patch('/:contact_id', function(req, res, next) {
        var contactData = req.body;
        if (contactData) {
            contactData.findOne({_id: new ObjectId(req.params.contact_id)}, function(err, contact){
                if(err) throw err;
                else if(!contact) res.status(404).send("Couldn't find the contact");
                else {
                    contact = newEmail;
                    contact.name = contactData.name || contact.name;
                    contact.surname = contactData.surname || contact.surname;
                    contact.email = contactData.email || contact.email;
                    contact.phoneNumber = contactData.phoneNumber|| contact.phoneNumber;
                    contact.company = contactData.company|| contact.company;

                    contact.save(function(err, c){
                        if(err) throw err;
                        res.status(200).send('email changed correctly');
                    });
                }
            });
        }
        else {
            res.status(404).send("Wrong parameters");
        }
    });

   contactRouter.delete('/:contact_id', function(req, res, next){
      var contact_id = req.params.contact_id;
      //Find the contact
      contactModel.findOne({_id: new ObjectId(contact_id)}, function(err, contact) {
         if(err) throw err;
         else if(!contact) res.status(404).send("Not found");
         else {
            //Find the user of the contact
            userModel.findOne({_id: new ObjectId(req.user._id)}, function(err, user) {
               if(err) throw err;
               else {
                  //Remove the contact from the users list
                  _.pull(user.tasks, contact._id);
                  user.save(function(err, user) {
                     if(err) throw err;
                     //Finally, remove the contact from database
                     else contact.remove(function(err){
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

    module.exports = contactRouter;
})();