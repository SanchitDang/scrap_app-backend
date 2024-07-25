// index.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDatabase } from "./config/db.js";
import IndexRoutes from "./routes/index.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api', IndexRoutes);

connectDatabase().then(() => {
  app.listen(process.env.NODE_PORT, () => {
    console.log(`Server Running at Port ${process.env.NODE_PORT}`);
  });
}).catch(() => {
  console.log("Failed to start the server.");
});
