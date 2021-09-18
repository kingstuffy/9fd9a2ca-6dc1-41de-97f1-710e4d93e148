describe('HealthController', () => {
  describe('#Check [GET /health]', () => {
    it('should return 200: OK', async () => {
      await request(sails.hooks.http.app)
        .get('/health')
        .expect(200);
    });
  });
});
