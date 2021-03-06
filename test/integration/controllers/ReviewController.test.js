const { createDbRecord, clearDb } = require('../../utils/db');
const productProvider = require('../../fixtures/product');
const reviewProvider = require('../../fixtures/review');

const models = ['product', 'review'];

describe('ReviewController', () => {
  afterEach(clearDb(models));

  describe('#create [POST /review]', () => {
    after('Restore notifications helper', (done) => {
      sails.helpers.pushNotifications.trigger.restore();
      done();
    });

    it('should create review with product ID and send notifications', async () => {
      const notificationsStub = sinon.stub(sails.helpers.pushNotifications, 'trigger');

      const product = await createDbRecord('product', productProvider.getRecord());
      const newReview = reviewProvider.getRecord({ product: product.id });
      const response = await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(201);

      response.body.should.have.property('data');
      response.body.data.should.have.property('review');
      response.body.data.review.should.have.property('text', newReview.text);

      notificationsStub.firstCall.args.should.have.lengthOf(3);
      const [channel, event] = notificationsStub.firstCall.args;
      channel.should.equal('test');
      event.should.equal('new-review');
    });

    it('should create review with product slug', async () => {
      const product = await createDbRecord('product', productProvider.getRecord());
      const newReview = reviewProvider.getRecord({ product: product.slug });
      const response = await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(201);
      response.body.should.have.property('data');
      response.body.data.should.have.property('review');
      response.body.data.review.should.have.property('text', newReview.text);
    });

    it('should return 400: validation error, missing rating', async () => {
      const newReview = _.omit(reviewProvider.getRecord(), 'rating');
      const response = await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(400);
      response.body.should.have.property('err');
      response.body.err.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });

    it('should return 400: validation error, min rating of 1', async () => {
      const newReview = reviewProvider.getRecord({ rating: 0 });
      const response = await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(400);
      response.body.should.have.property('err');
      response.body.err.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });

    it('should return 400: validation error, max rating of 5', async () => {
      const newReview = reviewProvider.getRecord({ rating: 6 });
      const response = await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(400);
      response.body.should.have.property('err');
      response.body.err.should.have.property('code', 'E_MISSING_OR_INVALID_PARAMS');
    });

    it('should return 400: validation error, invalid product', async () => {
      const newReview = reviewProvider.getRecord({ product: chance.guid() });
      await request(sails.hooks.http.app)
        .post('/review')
        .send(newReview)
        .expect(400);
    });
  });
});
