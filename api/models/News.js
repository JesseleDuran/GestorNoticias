/**
 * News.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },

        titulo: {
            type: 'string',
            required: true
        },

        cuerpo: {
            type: 'string',
            required: true
        },

        owner: {
            model: 'user'
        }

    }
};
