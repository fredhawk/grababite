import { db, client } from './drizzle';
import { UsersTest } from './schema/schema';

await db.insert(UsersTest).values([
	{
		name: 'Rob',
		attack: 10,
		id: 'number1'
	},
	{
		name: 'Rad',
		attack: 5,
		id: 'number2'
	}
]);

await client.end();
