import { http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

import ingredients from '../fixtures/ingredients.json';
import user from '../fixtures/user.json';
import order from '../fixtures/order.json';

const handlers = [
  http.get('https://norma.nomoreparties.space/api/auth/user', () => {
    return HttpResponse.json(user);
  }),
  http.get('https://norma.nomoreparties.space/api/ingredients', () => {
    return HttpResponse.json(ingredients);
  }),
  http.post('https://norma.nomoreparties.space/api/orders', async () => {
    return HttpResponse.json(order);
  }),
];

export const worker = setupWorker(...handlers);
