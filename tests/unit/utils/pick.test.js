const faker = require('faker');
const pick = require('../../../src/utils/pick');

describe('Config Environment', () => {
  describe('Pick Utils', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        address: faker.address.streetAddress(true),
        email: faker.internet.email().toLowerCase(),
        password: 'password1',
        role: 'user',
      };
    });

    test('should return object composed of the picked object properties', async () => {
      expect(pick(newUser, ['name', 'address'])).toMatchObject({
        name: newUser.name,
        address: newUser.address,
      });
    });
  });

  // TODO: Tambahkan test untuk development dan production
});
