"use strict";
// import winston from "winston";
// export const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: "error.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "orange",
        warn: "yellow",
        error: "red",
        fatal: "red",
    },
};
const formatter = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.splat(), winston_1.default.format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""}`;
}));
class Logger {
    log(arg0) {
        throw new Error("Method not implemented.");
    }
    constructor() {
        const prodTransport = new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error",
        });
        const transport = new winston_1.default.transports.Console({
            format: formatter,
        });
        this.logger = winston_1.default.createLogger({
            level: isDevEnvironment() ? "trace" : "error",
            levels: customLevels.levels,
            transports: [isDevEnvironment() ? transport : prodTransport],
        });
        winston_1.default.addColors(customLevels.colors);
    }
    trace(msg, meta) {
        this.logger.log("trace", msg, meta);
    }
    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }
    info(msg, meta) {
        this.logger.info(msg, meta);
    }
    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }
    error(msg, meta) {
        this.logger.error(msg, meta);
    }
    fatal(msg, meta) {
        this.logger.log("fatal", msg, meta);
    }
}
function isDevEnvironment() {
    return process.env.NODE_ENV === 'development';
}
exports.logger = new Logger();
//# sourceMappingURL=error.controller.js.map