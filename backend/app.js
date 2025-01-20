const express = require("express");
const cors = require("cors");
const connectDB = require("./configuration/dbConfig.js");
const authRouter = require("./routes/authRouter.js");
const taskRouter = require("./routes/taskRouter.js");
const usersRouter = require("./routes/usersRouter.js");

connectDB();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 7500;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/task", taskRouter);


app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running...",
  });
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
