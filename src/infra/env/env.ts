import { z } from "zod"
import { fromZodError } from "zod-validation-error"

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PRIVATE_KEY: z.string(),
  PUBLIC_KEY: z.string(),
  GEOLOCATION_API_KEY: z.string(),
  GEOLOCATION_API_URL: z.string().url(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_KEY: z.string(),
  AWS_BUCKET_NAME: z.string(),
  PORT: z.coerce.number().default(3000),
})

export type Env = z.infer<typeof envSchema>

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("Invalid environment variables", fromZodError(_env.error))

  throw new Error("Invalid environment variables")
}

export const env = _env.data
