import { PrismaClient } from "@prisma/client";

// Declare a global variable to hold the PrismaClient instance.
// This is a common practice to handle hot-reloading in development.
declare global {
  // Allow global `var` declarations for a shared client
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  // In production, instantiate the client normally
  prisma = new PrismaClient()
} else {
  // In development, use the global variable to prevent creating new instances
  // on every hot reload, which can exhaust the connection pool.
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma

