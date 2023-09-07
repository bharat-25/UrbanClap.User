"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redFun = void 0;
const redis_1 = require("redis");
let client = (0, redis_1.createClient)();
const redFun = () => {
    client.connect().then(() => {
        console.log("Redis Connected");
    });
};
exports.redFun = redFun;
exports.default = client;
//# sourceMappingURL=redis.js.map