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
      required: true,
    },
    rating: {
      type: 'number',
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
