require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const databaseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error('Missing database URL. Set PRISMA_DATABASE_URL or DATABASE_URL or POSTGRES_URL.');
}

let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });
  }
  prisma = global.prisma;
}

module.exports = prisma;
