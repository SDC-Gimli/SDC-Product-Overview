import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1000,
  duration: '30s',
};

export default function () {
  // http.get('https://test.k6.io');
  http.get('http://localhost:3000/api/products/533/styles');
  sleep(1);
}
