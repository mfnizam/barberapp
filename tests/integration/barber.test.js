const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, barberOne, barberOneRoleDetail, admin, insertUsers, insertBarbers } = require('../fixtures/user.fixture');
const { userOneAccessToken, barberOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('User routes', () => {
  describe('GET /v1/barbers', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertBarbers([barberOneRoleDetail]);
      await insertUsers([userOne, barberOne, admin]);

      const res = await request(app)
        .get('/v1/barbers')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0]).toEqual({
        id: barberOne._id.toHexString(),
        name: barberOne.name,
        address: barberOne.address,
        email: barberOne.email,
        role: barberOne.role,
        // roleDetail: barberOne.roleDetail,
        isEmailVerified: barberOne.isEmailVerified,
      });
    });

    test('should return 200 and users that has role as barber', async () => {
      await insertUsers([userOne, barberOne, admin]);

      const res = await request(app)
        .get('/v1/barbers')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).toEqual({
        results: expect.any(Array),
        page: 1,
        limit: 10,
        totalPages: 1,
        totalResults: 1,
      });
      expect(res.body.results).toHaveLength(1);
      expect(res.body.results[0].id).toBe(barberOne._id.toHexString());
      expect(res.body.results[0].role).toBe('barber');
      expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    })

    // test('should return 401 if access token is missing', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   await request(app).get('/v1/barbers').send().expect(httpStatus.UNAUTHORIZED);
    // });

    // test('should correctly apply filter on name field', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${userOneAccessToken}`)
    //     .query({ name: barberOne.name })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1,
    //     totalResults: 1,
    //   });
    //   expect(res.body.results).toHaveLength(1);
    //   expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    //   expect(res.body.results[0].id).toBe(barberOne._id.toHexString());
    // });

    // test('should correctly apply filter on name field using substring', async () => {
    //   await insertUsers([userOne, barberOne, admin]);
    //   const name = JSON.stringify({
    //     $regex: barberOne.name.slice(0, barberOne.name.length - 2),
    //     $options: 'i',
    //   });
    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${userOneAccessToken}`)
    //     .query({ name })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1,
    //     totalResults: 1,
    //   });
    //   expect(res.body.results).toHaveLength(1);
    //   expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    //   expect(res.body.results[0].id).toBe(barberOne._id.toHexString());
    // });

    // test('should correctly sort the returned array if descending sort param is specified', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${userOneAccessToken}`)
    //     .query({ sortBy: '_id:desc' })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1,
    //     totalResults: 2,
    //   });
    //   expect(res.body.results).toHaveLength(2);
    //   expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    //   expect(res.body.results[0].id).toBe(barberTwo._id.toHexString());
    //   expect(res.body.results[1].id).toBe(barberOne._id.toHexString());
    // });

    // test('should correctly sort the returned array if ascending sort param is specified', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .query({ sortBy: '_id:asc' })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1,
    //     totalResults: 2,
    //   });
    //   expect(res.body.results).toHaveLength(2);
    //   expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    //   expect(res.body.results[0].id).toBe(barberOne._id.toHexString());
    //   expect(res.body.results[1].id).toBe(barberTwo._id.toHexString());
    // });

    // test('should correctly sort the returned array if multiple sorting criteria are specified', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .query({ sortBy: 'role:desc,name:asc' })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 10,
    //     totalPages: 1,
    //     totalResults: 2,
    //   });
    //   expect(res.body.results).toHaveLength(2);

    //   const expectedOrder = [barberOne, barberTwo].sort((a, b) => {
    //     if (a.role < b.role) {
    //       return 1;
    //     }
    //     if (a.role > b.role) {
    //       return -1;
    //     }
    //     return a.name < b.name ? -1 : 1;
    //   });

    //   expectedOrder.forEach((user, index) => {
    //     expect(res.body.results[index].id).toBe(user._id.toHexString());
    //   });
    // });

    // test('should limit returned array if limit param is specified', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .query({ limit: 1 })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 1,
    //     limit: 1,
    //     totalPages: 2,
    //     totalResults: 2,
    //   });
    //   expect(res.body.results).toHaveLength(1);
    //   expect(res.body.results.every(user => user.role == 'barber')).toBe(true);
    //   expect(res.body.results[0].id).toBe(barberOne._id.toHexString());
    // });

    // test('should return the correct page if page and limit params are specified', async () => {
    //   await insertUsers([userOne, barberOne, admin]);

    //   const res = await request(app)
    //     .get('/v1/barbers')
    //     .set('Authorization', `Bearer ${adminAccessToken}`)
    //     .query({ page: 2, limit: 1 })
    //     .send()
    //     .expect(httpStatus.OK);

    //   expect(res.body).toEqual({
    //     results: expect.any(Array),
    //     page: 2,
    //     limit: 1,
    //     totalPages: 2,
    //     totalResults: 2
    //   });
    //   expect(res.body.results).toHaveLength(1);
    //   expect(res.body.results[0].id).toBe(barberTwo._id.toHexString());
    // });
  });

  // describe('GET /v1/barbers/:userId', () => {
  //   test('should return 200 and the barber object if data is ok', async () => {
  //     await insertUsers([userOne, barberOne]);

  //     const res = await request(app)
  //       .get(`/v1/barbers/${barberOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.OK);

  //     expect(res.body).not.toHaveProperty('password');
  //     expect(res.body).toEqual({
  //       id: barberOne._id.toHexString(),
  //       email: barberOne.email,
  //       address: barberOne.address,
  //       name: barberOne.name,
  //       role: barberOne.role,
  //       isEmailVerified: barberOne.isEmailVerified,
  //     });
  //   });

  //   test('should return 200 and the barber object if admin is trying to get another barber', async () => {
  //     await insertUsers([barberOne, admin]);

  //     await request(app)
  //       .get(`/v1/barbers/${barberOne._id}`)
  //       .set('Authorization', `Bearer ${adminAccessToken}`)
  //       .send()
  //       .expect(httpStatus.OK);
  //   });

  //   test('should return 401 error if access token is missing', async () => {
  //     await insertUsers([barberOne]);

  //     await request(app).get(`/v1/barbers/${barberOne._id}`).send().expect(httpStatus.UNAUTHORIZED);
  //   });

  //   test('should return 400 error if userId is not a valid mongo id', async () => {
  //     await insertUsers([userOne]);

  //     await request(app)
  //       .get('/v1/barbers/invalidId')
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.BAD_REQUEST);
  //   });

  //   test('should return 404 error if barber is not found', async () => {
  //     await insertUsers([userOne]);

  //     await request(app)
  //       .get(`/v1/barbers/${barberOne._id}`)
  //       .set('Authorization', `Bearer ${userOneAccessToken}`)
  //       .send()
  //       .expect(httpStatus.NOT_FOUND);
  //   });
  // });
});
