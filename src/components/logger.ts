import winston from 'winston';
import { DEVELOPMENT, TIMESTAMP_FORMAT_LOG } from '../constants';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): string => {
  const env = process.env.NODE_ENV || DEVELOPMENT;
  const isDevelopment = env === DEVELOPMENT;
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: TIMESTAMP_FORMAT_LOG }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const log = `${info.timestamp} ${info.level}: ${info.message}`;
    if (info.method) {
      const { method, path, query, body } = info;
      const queryParams = Object.keys(query).length !== 0 ? `, query params: ${JSON.stringify(query)}` : '';
      const inputBody = body ? `, body: ${JSON.stringify(body)}` : '';
      return `${log}, method: ${method}, path: ${path}${queryParams}${inputBody}`;
    }
    if (info.stack) {
      return `${log}\n${info.stack}`;
    }
    return log;
  }),
);
const transports = [new winston.transports.Console()];

export const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});
