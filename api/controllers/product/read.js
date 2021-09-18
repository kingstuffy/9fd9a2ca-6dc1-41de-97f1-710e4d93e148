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
          'reviews': [
            {
              'createdAt': 1631994010280,
              'updatedAt': 1631994010280,
              'id': '6146409a56d629467ef3fa34',
              'text': 'Some ratings text',
              'rating': 4,
              'isDeleted': false,
              'product': '614637af8e3f5b41e0136155'
            }
          ],
          'createdAt': 1631991727861,
          'updatedAt': 1631991727861,
          'id': '614637af8e3f5b41e0136155',
          'name': 'The Minimalist Entrepreneur',
          'slug': 'default',
          'isDeleted': false
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
    }).populate('reviews', { sort: 'createdAt DESC' });

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
