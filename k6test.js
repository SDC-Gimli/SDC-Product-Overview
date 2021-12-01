import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10000,
  duration: '15s',
};

export default function () {
  // http.get('https://test.k6.io');
  http.get('http://52.53.203.15/api/products/533/styles');
  sleep(1);
}
