/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  const defaultProduct = {
    name: 'The Minimalist Entrepreneur',
    slug: 'default'
  };

  try {
    // Finds or create default product that can be fetched by the UI
    await Product.findOrCreate({ slug: defaultProduct.slug }, defaultProduct);
  } catch (e) {
    console.error('Unable to create default product', e);
  }
};
