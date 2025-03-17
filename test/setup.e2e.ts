import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"

import { PrismaClient } from "@prisma/client"
import { config } from "dotenv"

import { env } from "@/infra/env/env"

config({ path: ".env.test", override: true })

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(schemaId: string) {
  const databaseURL = new URL(env.DATABASE_URL)

  databaseURL.searchParams.set("schema", schemaId)

  return databaseURL.toString()
}

const schemaId = randomUUID()

beforeAll(() => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL

  execSync("npx prisma migrate deploy")
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
