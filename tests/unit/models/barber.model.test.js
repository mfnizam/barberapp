const faker = require('faker');
const { Barber } = require('../../../src/models');
const { barberOne } = require('../../fixtures/user.fixture');

describe('Barber model', () => {
  describe('Barber validation', () => {
    let newBarber;
    beforeEach(() => {
      newBarber = {
        user: barberOne._id,
        active: barberOne.active,
        price: faker.commerce.price(10000, 50000, 0),
        detail: faker.lorem.lines(),
        workingHours: [
          {
            dayOfWeek: 0,
            close: true,
          },
          {
            dayOfWeek: 1,
            hourStart: 0,
            hourEnd: 60,
            close: false,
          },
          {
            dayOfWeek: 2,
            hourStart: 0,
            hourEnd: 60,
            close: false,
          },
          {
            dayOfWeek: 3,
            hourStart: 0,
            hourEnd: 60,
            close: false,
          },
          {
            dayOfWeek: 4,
            hourStart: 0,
            hourEnd: 60,
            close: false,
          },
          {
            dayOfWeek: 5,
            hourStart: 0,
            hourEnd: 60,
            close: false,
          },
          {
            dayOfWeek: 6,
            hourStart: 0,
            hourEnd: 120,
            close: false,
          },
        ],
      };
    });

    test('should correctly validate a valid barber', async () => {
      await expect(new Barber(newBarber).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if hourStart and hourEnd empty when close equal to false', async () => {
      newBarber.workingHours[0].close = false;
      await expect(new Barber(newBarber).validate()).rejects.toThrow();
    });

    test('should throw a validation error if user not valid id', async () => {
      newBarber.user = 'notvalidid';
      await expect(new Barber(newBarber).validate()).rejects.toThrow();
    });
  });

  // describe('Barber toJSON()', () => {
  //   test('should not return barber password when toJSON is called', () => {
  //     const newBarber = {
  //       name: faker.name.findName(),
  //       email: faker.internet.email().toLowerCase(),
  //       password: 'password1',
  //       role: 'barber',
  //     };
  //     expect(new Barber(newBarber).toJSON()).not.toHaveProperty('password');
  //   });
  // });
});
