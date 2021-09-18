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
        'data': {}
      }
    },
    invalid: {
      responseType: 'badRequest',
      description: 'The provided input parameters are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request ' +
        'parameters should have been validated/coerced _before_ they were sent.'
    },
    notFound: {
      statusCode: 404,
      description: 'Product not found',
      outputExample: {
        'message': 'Product not found',
      }
    },
  },
  fn: async function (inputs, exits) {
    const product = await Product.findOne({
      or: [{ id: inputs.product }, { slug: inputs.product }],
      isDeleted: false
    });
    if (!product) {
      return exits.notFound({ message: 'Product not found' });
    }

    const review = await Review.create({ ...inputs, product: product.id })
      .intercept({ name: 'UsageError' }, (err) => (
        { invalid: { err, message: 'Invalid request' } }
      ))
      .fetch();

    const response = {
      message: 'Review created successfully',
      data: review,
    };
    return exits.success(response);
  }
};
