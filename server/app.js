import dotenv from "dotenv";
dotenv.config();

//extra security packages
import helmet from "helmet";
import cors from "cors";
import xss from "xss-clean";
import { rateLimit } from "express-rate-limit";
import express from "express";
import routes from "./routes/index.js";
const app = express();

//connectDB
import connectDB from "./db/connect.js";

//routers
app.use("/api/v1/",routes);

//middlewares
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(xss());


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //uncomment below line after add environment variables 
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
