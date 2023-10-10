import express from "express";
import { dbConnect } from "./database/conn";
import dotenv from "dotenv";
import userRoute from "./routes/user.route";
import bookingRoute from "./routes/booking.route";
import redis, { redFun } from "./utils/redis";
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
dbConnect();
app.use("/user", userRoute);
app.use("/booking", bookingRoute);
redFun();

const swaggerDocument = require("./swagger_output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
