import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './lib/routes';
import cookieParser from 'cookie-parser';
const app = express();

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(cookieParser());

//  Routes
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: '🚀 Server is running',
  });
});

// API routes
app.use('/api', routes);

// Route not found Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
  });
});

//  Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || 'Internal Server Error',
  });
});

export default app;
