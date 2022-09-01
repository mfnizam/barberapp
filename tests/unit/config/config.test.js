const config = require('../../../src/config/config');

describe('Config Environment', () => {
  describe('MongoDb Url', () => {
    config.env = 'test'

    test('should return local mongoose Url with test database', async () => {
      expect(config.mongoose.url).toBe("mongodb://127.0.0.1:27017/barber-test");
    });

    test('should return local jwt secret', async () => {
      expect(config.jwt.secret).toBe("localsecret");
    });
  });

  // TODO: Tambahkan test untuk development dan production
});
