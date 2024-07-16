import express from "express";
import cors from "cors";

// App configurations
const app = express();

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cors());

// Routes imports
import songsRouter from "./routes/songs.routes.js";
import albumRouter from "./routes/albums.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/songs", songsRouter);
app.use("/api/v1/albums", albumRouter);
app.use("/api/v1/users", userRouter);

export { app };
