export const loggerOptions = {
  server: process.env.UDP_LOGGER_HOST || 'logstash',
  port: parseInt(process.env.UDP_LOGGER_PORT || '5120', 10),
};

export const metricsOptions = {
  server: process.env.METRICS_HOST || 'kapacitor',
  port: parseInt(process.env.METRICS_PORT || '4444', 10),
  curlMeasurement: process.env.CURL_METRICS_MEASUREMENT || 'monolith',
  processMeasurement: process.env.PROCESS_METRICS_MEASUREMENT || 'connectors',
};

export const appOptions = {
  port: parseInt(process.env.APP_PORT || '8080', 10),
  debug: (process.env.APP_DEBUG === 'debug'),
};
