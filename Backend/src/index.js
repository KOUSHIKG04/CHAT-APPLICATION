import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { app } from "./app.js";
import { createServer } from "http";
import { initSocket } from "./lib/socketio.js";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = createServer(app); const io = initSocket(server);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection failed", error);
  });
