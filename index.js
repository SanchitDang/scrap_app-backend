// index.js
import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import "dotenv/config";
import morgan from "morgan";
import { connectDatabase } from "./config/db.js";
import IndexRoutes from "./routes/index.routes.js";

const app = express();

// Resolve __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting cors for vercel deploy
app.use(cors(
  {
      origin: ["https://scrap-app-admin.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', IndexRoutes);

// Connect to the database and listen to server
connectDatabase().then(() => {
  app.listen(process.env.NODE_PORT, () => {
    console.log(`Server Running at Port ${process.env.NODE_PORT}`);
  });
}).catch(() => {
  console.log("Failed to start the server.");
});

