const config = sails.config.custom.pushNotifications;

module.exports = {
  friendlyName: 'Create review',
  description: 'Creates review',
  inputs: {
    text: {
      type: 'string',
      friendlyName: 'Text',
      description: 'Review Text',
      example: 'Boy\'s scout',
    },
    rating: {
      type: 'number',
      friendlyName: 'Rating',
      description: 'Review\'s rating',
      min: 0.5,
      max: 5,
      example: 4,
      required: true,
    },
    product: {
      type: 'string',
      friendlyName: 'Product ID or slug',
      description: 'Product to review',
      example: '7ba38f739986c5c407d1',
      required: true,
    },
  },
  exits: {
    success: {
      statusCode: 201,
      friendlyName: 'Created review',
      description: 'Created review',
      outputExample: {
        'message': 'Review created successfully',
        'data': {
          'averageRating': 3.5,
          'review': {
            'createdAt': 1631994010280,
            'updatedAt': 1631994010280,
            'id': '6146409a56d629467ef3fa34',
            'text': 'Some ratings text',
            'rating': 4,
            'isDeleted': false,
            'product': '614637af8e3f5b41e0136155'
          }
        }
      }
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided input parameters are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
  },
  fn: async function (inputs, exits) {
    const product = await Product.findOne({
      or: [{ id: inputs.product }, { slug: inputs.product }],
      isDeleted: false
    });
    if (!product) {
      return exits.invalid({ message: 'Product not found' });
    }

    const review = await Review.create({ ...inputs, product: product.id })
      .intercept({ name: 'UsageError' }, (err) => (
        { invalid: { err, message: 'Invalid request' } }
      ))
      .fetch();

    const averageRating = await sails.helpers.product.getAverageRating(product.id);
    sails.helpers.pushNotifications.trigger(config.newReviewChannel, 'new-review', { averageRating });

    const response = {
      message: 'Review created successfully',
      data: { averageRating, review },
    };
    return exits.success(response);
  }
};
