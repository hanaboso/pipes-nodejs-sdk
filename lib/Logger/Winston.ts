import winston from 'winston';
import Severity from './Severity';

let level;
switch (process.env.NODE_ENV) {
  case 'debug':
    level = Severity.DEBUG;
    break;
  case 'test':
    level = Severity.WARNING;
    break;
  default:
    level = Severity.INFO;
}

const consoleT = new winston.transports.Console({
  format: winston.format.splat(),
});

const winstonLogger = winston.createLogger({
  level,
  transports: [consoleT],
});

export default winstonLogger;
