/**
 * Mock setup for Problem 1 - Replace DOM fakery with axios-mock-adapter
 *
 * This file sets up axios-mock-adapter to intercept API calls and return mock data
 * instead of using the DOM fakery approach from the original project.
 *
 * Students can use this for Problem 1 instead of loading modelData/photoApp.js into the DOM
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import models from '../modelData/photoApp.js';

// Create mock adapter instance
const mock = new MockAdapter(axios);

// Set up mock responses for all endpoints
mock.onGet('/test/info').reply(200, models.schemaInfo());
mock.onGet('/user/list').reply(200, models.userListModel());
mock.onGet(/\/user\/\w+/).reply((config) => {
  const id = config.url.split('/user/')[1];
  const user = models.userModel(id);
  return user ? [200, user] : [400, 'Not found'];
});
mock.onGet(/\/photosOfUser\/\w+/).reply((config) => {
  const id = config.url.split('/photosOfUser/')[1];
  const photos = models.photoOfUserModel(id);
  return photos.length > 0 ? [200, photos] : [400, 'Not found'];
});

// eslint-disable-next-line no-console
console.log('Mock adapter set up - API calls will be intercepted');

export default mock;
