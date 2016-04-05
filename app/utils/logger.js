import winston from 'winston';

const logger = new winston.Logger({
  colorize: true,
  transports: [
    new winston.transports.Console(),
  ]
});

export default logger;
