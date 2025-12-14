import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { initSocket } from "./socket";

const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

//  Routes 
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "🚀 Server is running",
  });
});

// API routes
// app.use("/api", routes);

// Route not found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route not found",
  });
});

//  Error Handler 
app.use(
  (err: any, _req: Request, res: Response, _next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      statusCode,
      message: err.message || "Internal Server Error",
    });
  }
);

/* Init socket IO */
const httpServer = createServer(app);

initSocket(httpServer)

export default app
