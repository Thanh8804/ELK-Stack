// File này chịu trách nhiệm khởi tạo logger sử dụng Winston và xuất logger.stream để ghi log request.

const winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");

const {
  format: { combine, colorize, timestamp, json },
} = winston;

// ghi log vào folder logs theo ngày
const fileTransport = new winston.transports.DailyRotateFile({
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "3m",
  maxFiles: "7d",
  dirname: path.join(__dirname, "./logs"),
});

const logger = winston.createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [fileTransport],
});

logger.stream = {
  write: (message) => {
    logger.info(message);
    console.log(message)
  },
};

module.exports = logger;