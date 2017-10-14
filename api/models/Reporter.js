/**
 * Reporter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

    attributes: {

        nombre: {
            type: 'string',
            required: true
        },

        apellido: {
            type: 'string',
            required: true
        },

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: 'string',
            unique: true,
            required: true
        },

        password: {
            type: 'string',
            required: true,
            minLength: 5,
        },

        news: {
            collection: 'news',
            via: 'owner'
        },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

    },

    beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    console.log(hash);
                    cb(null, user);
                }
            });
        });
    }
};
