module.exports = {
  friendlyName: 'Product',
  description: 'Product retrieval endpoint',
  exits: {
    success: {
      statusCode: 200,
      friendlyName: 'Product',
      description: 'Retrieved Product',
      outputType: 'json',
      outputExample: {
        'message': 'Product retrieved successfully',
        'data': {
          'createdAt': 1533106809805,
          'updatedAt': 1533106809805,
          'id': 3,
        }
      },
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
    const id = this.req.params.id;
    const product = await Product.findOne({
      or: [{ id }, { slug: id }],
      isDeleted: false
    });

    if (!product) {
      return exits.notFound({ message: 'Product not found' });
    }

    const response = {
      message: 'Product retrieved successfully',
      data: product,
    };
    return exits.success(response);
  }
};
