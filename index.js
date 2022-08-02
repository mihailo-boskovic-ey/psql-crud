import express from "express";
import bodyParser from "body-parser";
import userRouter from "./router/user.router.js";
import carRouter from "./router/car.router.js";

// dontenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/car", carRouter);

app.listen(PORT, () => {
  console.log(`App listening on PORT=${PORT}`);
});
