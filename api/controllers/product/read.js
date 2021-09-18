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
              'createdAt': 1631998872644,
              'updatedAt': 1631998872644,
              'id': '6146539848252152ccdf626f',
              'text': 'Some ratings text',
              'rating': 3,
              'isDeleted': false,
              'product': '614642ae3fb280499cebf6df'
            },
            {
              'createdAt': 1631998866750,
              'updatedAt': 1631998866750,
              'id': '6146539248252152ccdf626e',
              'text': 'Some ratings text',
              'rating': 4,
              'isDeleted': false,
              'product': '614642ae3fb280499cebf6df'
            }
          ],
          'createdAt': 1631994542875,
          'updatedAt': 1631994542875,
          'id': '614642ae3fb280499cebf6df',
          'name': 'The Minimalist Entrepreneur',
          'slug': 'default',
          'isDeleted': false,
          'averageRating': 3.5
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

    const averageRating = await Review.avg('rating')
      .where({
        product: product.id
      });

    const response = {
      message: 'Product retrieved successfully',
      data: { ...product, averageRating },
    };
    return exits.success(response);
  }
};
