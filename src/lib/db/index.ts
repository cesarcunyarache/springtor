/* export const runtime = 'nodejs';  */
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import * as schema from "./schema"

const pool = postgres(process.env.POSTGRES_URL!, { max: 1 })

export const db = drizzle(pool, {
  schema,
})