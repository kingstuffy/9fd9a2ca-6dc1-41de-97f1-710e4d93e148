module.exports = {
  friendlyName: 'Get average rating',
  description: 'Get average rating of a product',
  inputs: {
    product: {
      type: 'string',
      friendlyName: 'Product ID',
      example: '7ba38f739986c5c407d1',
      required: true,
    },
  },
  exits: {
    success: {
      outputFriendlyName: 'Success',
      outputExample: '4.5'
    },
  },
  async fn(inputs, exits) {
    const averageRating = await Review.avg('rating')
      .where({
        product: inputs.product,
      });

    exits.success(parseFloat(averageRating.toFixed(1)));
  }
};
