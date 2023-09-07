"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conn_1 = require("./database/conn");
const dotenv_1 = __importDefault(require("dotenv"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const booking_route_1 = __importDefault(require("./routes/booking.route"));
const redis_1 = require("./utils/redis");
const swaggerUi = require("swagger-ui-express");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
(0, conn_1.dbConnect)();
app.use("/user", user_route_1.default);
app.use("/booking", booking_route_1.default);
(0, redis_1.redFun)();
const swaggerDocument = require("./swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map