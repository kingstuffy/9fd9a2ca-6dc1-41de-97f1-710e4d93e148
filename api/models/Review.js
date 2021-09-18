/**
 * Review.js
 *
 * @description :: Review Model: Stores the product reviews
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    text: {
      type: 'string',
    },
    rating: {
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    product: {
      model: 'product',
      required: true,
    },
    isDeleted: {
      type: 'boolean',
      defaultsTo: false
    },
  },
};
