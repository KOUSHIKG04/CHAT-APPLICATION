import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { app } from "./app.js";
import { createServer } from "http";
import { initSocket } from "./lib/socketio.js";
import path from "path";
// import { seedDatabase } from "./seeds/user.seed.js";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5000;
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend", "dist", "index.html"));
  });
}

connectDB()
  .then(async () => {
    // await seedDatabase(); // used to seed users database

    const server = createServer(app);
    initSocket(server);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection failed", error);
  });
