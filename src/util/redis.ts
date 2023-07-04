import Redis from 'ioredis';

const redis = new Redis({
  // host: get from secret
  // port: get from secret
  port: 6379,
  host: '127.0.0.1',
});

export default redis;
