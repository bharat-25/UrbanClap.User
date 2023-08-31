import express from "express";
import { dbConnect } from "./src/database/conn";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route";
import bookingRoute from "./src/routes/booking.route";
import redis, { redFun } from "./src/utils/redis";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
dbConnect();
app.use("/user", userRoute);
app.use("/booking", bookingRoute);
redFun();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./newSwaggar.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
