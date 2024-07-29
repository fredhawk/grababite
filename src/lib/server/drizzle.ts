import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import config from '../../../drizzle.config';

export const client = postgres(config.dbCredentials.url);
export const db = drizzle(client, {
	schema: {
		// Monster,
	}
});
