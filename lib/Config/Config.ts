export const loggerOptions = {
  server: process.env.UDP_LOGGER_HOST || '127.0.0.40',
  port: parseInt(process.env.UDP_LOGGER_PORT || '5120', 10),
};

export const metricsOptions = {
  server: process.env.METRICS_HOST || '127.0.0.40',
  port: parseInt(process.env.METRICS_PORT || '4444', 10),
  curlMeasurement: process.env.CURL_METRICS_MEASUREMENT || 'monolith',
  processMeasurement: process.env.PROCESS_METRICS_MEASUREMENT || 'connectors',
};

export const storageOptions = {
  dsn: process.env.MONGO_DSN || 'mongodb://127.0.0.40:27017',
};

export const appOptions = {
  port: parseInt(process.env.APP_PORT || '8080', 10),
  debug: (process.env.APP_DEBUG === 'debug'),
};

export const cryptOptions = {
  secret: process.env.CRYPT_SECRET || 'ThisIsNotSoSecret',
};
