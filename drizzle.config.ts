import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config({ path: '.env' }));

export default {
	dialect: 'postgresql',
	schema: './src/lib/server/schema/schema.ts',
	out: './src/lib/server/migrations',
	dbCredentials: {
		url: process.env.DATABASE_URL! as string
	},
	schemaFilter: 'public'
} satisfies Config;
