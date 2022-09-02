const path = require('path');
const dotenv = require('dotenv');
const config = require('../../../src/config/config');

dotenv.config({ path: path.join(__dirname, '../../.env') });

describe('Config Environment', () => {
  describe('MongoDb Url', () => {
    config.env = 'test';

    test('should return local mongoose Url with test database', async () => {
      expect(config.mongoose.url).toBe(process.env.MONGODB_URL + '-test');
    });

    test('should return local jwt secret', async () => {
      expect(config.jwt.secret).toBe(process.env.JWT_SECRET);
    });
  });

  // TODO: Tambahkan test untuk development dan production
});
