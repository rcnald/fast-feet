import { z } from "zod"
import { fromZodError } from "zod-validation-error"

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3000),
})

export type Env = z.infer<typeof envSchema>

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error("Invalid environment variables", fromZodError(_env.error))

  throw new Error("Invalid environment variables")
}

export const env = _env.data
