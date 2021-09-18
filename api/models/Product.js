/**
 * Product.js
 *
 * @description :: Product Model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
  },
};
