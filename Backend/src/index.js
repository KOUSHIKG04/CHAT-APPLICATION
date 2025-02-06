import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import { app } from "./app.js";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error(" MongoDB connection failed", error);
  });
