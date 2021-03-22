const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user");
const goalsRouter = require("./routes/goals");
dotenv.config();

const app = express();
app.use(cookieParser());

//Cors
const corsOpts = {
  origin: ["http://localhost:3003"],
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));

app.use(express.json());

//Routes
app.use("/api/users", userRouter);
app.use("/api", goalsRouter);

//Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running great ${port}`);
});



//Mongoose connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`mongoose connection is running great`);
});
