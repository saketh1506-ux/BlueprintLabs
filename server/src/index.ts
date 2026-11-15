import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Health & DB Connection verification endpoint
app.get('/api/health', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const projectCount = await prisma.project.count();
    res.json({
      status: 'healthy',
      database: 'connected',
      metrics: { users: userCount, projects: projectCount },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      message: error.message,
    });
  }
});

export { app, prisma };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 BlueprintLabs backend running on port ${PORT}`);
  });
}
