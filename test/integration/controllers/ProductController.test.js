const { createDbRecord, clearDb } = require('../../utils/db');
const productProvider = require('../../fixtures/product');
const reviewProvider = require('../../fixtures/review');
const thisModel = 'product';

describe('ProductController', () => {
  afterEach(clearDb(models));

  describe('#read [GET /product/:id]', () => {
    it('should return 404 for invalid product', async () => {
      const response = await request(sails.hooks.http.app)
        .get(`/product/${ chance.guid() }`)
        .expect(404);
      response.body.should.have.property('message');
    });

    it('should find product by ID', async () => {
      const newProduct = await createDbRecord(thisModel, productProvider.getRecord());
      const response = await request(sails.hooks.http.app)
        .get(`/product/${ newProduct.id }`)
        .expect(200);
      response.body.should.have.property('data');
      response.body.data.should.have.property('id', newProduct.id);
    });

    it('should find product by slug', async () => {
      const newProduct = await createDbRecord(thisModel, productProvider.getRecord());
      const response = await request(sails.hooks.http.app)
        .get(`/product/${ newProduct.slug }`)
        .expect(200);
      response.body.should.have.property('data');
      response.body.data.should.have.property('id', newProduct.id);
    });

    it('should find product along with reviews', async () => {
      const noOfReviews = chance.natural({ min: 1, max: 20 });
      const newProduct = await createDbRecord(thisModel, productProvider.getRecord());

      await createDbRecord(
        'review',
        reviewProvider.getRecord({ product: newProduct.id }, noOfReviews)
      );

      const response = await request(sails.hooks.http.app)
        .get(`/product/${ newProduct.id }`)
        .expect(200);
      response.body.should.have.property('data');
      response.body.data.should.have.property('id', newProduct.id);
      response.body.data.should.have.property('reviews');
      response.body.data.reviews.should.have.lengthOf(noOfReviews);
    });
  });
});
