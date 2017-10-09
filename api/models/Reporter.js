/**
 * Reporter.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

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
        }

        toJSON: function() {
            var obj = this.toObject();
            delete obj.clave;
            return obj;
        },

    }
};
