import '../../utils/dotenv';
import assert from 'assert';
import { expect } from 'chai';
import request from 'supertest';

const app = require('../../server');

describe('Unit testing the /home route', () => {
  it('should return OK status', () =>
    request(app)
      .get(`/api/v${process.env.API_VERSION}/health-check`)
      .then(response => {
        assert.equal(response.status, 200);
      }));

  it('should return message on rendering', () =>
    request(app)
      .get(`/api/v${process.env.API_VERSION}/health-check`)
      .then(response => {
        expect(response.header['content-type']).to.contain('json');
      }));

  it('should return correct body', () =>
    request(app)
      .get(`/api/v${process.env.API_VERSION}/health-check`)
      .then(response => {
        expect(response.body).to.deep.equal({
          code: 200,
          data: {
            message: 'Health is OK',
          },
        });
      }));
});
