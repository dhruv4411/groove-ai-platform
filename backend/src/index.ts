import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import metaRoutes from "./routes/meta.routes";
import chatRoutes from "./routes/chat.routes";

dotenv.config({ override: true });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/meta", metaRoutes);

app.use("/api/chat", chatRoutes);

app.get("/", (_, res) => {
  res.send("Groove AI Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});