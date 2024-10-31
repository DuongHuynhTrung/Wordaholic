const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config({ path: "./config.env" });
const path = require("path");
const errorHandler = require("./src/app/middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Socket Config
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
global._io = io;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Thiết lập tiêu đề cho Access-Control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Connect to DB
const db = require("./src/config/dbConnection");
db.connect();

// Định nghĩa các routes
const userRouter = require("./src/routes/UserRouter");
const authRouter = require("./src/routes/AuthRouter");
const itemRouter = require("./src/routes/ItemRouter");
const toolRouter = require("./src/routes/ToolRouter");

app.use(express.static(path.resolve(__dirname, "public")));

// Đăng ký routers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/items", itemRouter);
app.use("/api/tools", toolRouter);

// Xử lý lỗi
app.use(errorHandler);

// Khởi động server
httpServer.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
