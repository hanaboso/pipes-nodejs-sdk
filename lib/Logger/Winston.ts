import winston from 'winston';

let level;
switch (process.env.NODE_ENV) {
  case 'debug':
    level = 'debug';
    break;
  case 'test':
    level = 'alert';
    break;
  default:
    level = 'debug'; // TODO: info
}

const consoleT = new winston.transports.Console({
  format: winston.format.splat(),
});

const winstonLogger = winston.createLogger({
  level,
  transports: [consoleT],
});

export default winstonLogger;
