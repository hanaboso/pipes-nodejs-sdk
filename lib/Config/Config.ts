export const loggerOptions = {
  server: process.env.UDP_LOGGER_HOST || 'logstash',
  port: parseInt(process.env.UDP_LOGGER_PORT || '5120', 10),
};

export const appOptions = {
  port: parseInt(process.env.APP_PORT || '8080', 10),
  debug: (process.env.APP_DEBUG === 'debug'),
};
