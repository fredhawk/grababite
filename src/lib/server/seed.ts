import { faker } from '@faker-js/faker';
import { db, client } from './drizzle';
import { recipe, user } from './schema/schema';
import { Argon2id } from 'oslo/password';

type UserRole = 'admin' | 'user';
interface User {
	id: string;
	email: string;
	role?: UserRole;
	hashed_password: string;
}

interface Recipe {
	id: string;
	authorId: string;
	title: string;
	description: string;
	instructions: string;
	ingredients: string;
	note: string;
	yield: number;
	imageURL: string;
	preptime: number;
	cooktime: number;
	calories: number;
	fatcontent: number;
}

async function createRandomUser(): Promise<User> {
	return {
		id: faker.string.uuid(),
		email: faker.internet.email(),
		hashed_password: await new Argon2id().hash(faker.internet.password({ length: 17 })),
		role: Math.round(Math.random()) ? 'admin' : 'user'
	};
}

function createRandomRecipe(author: string): Recipe {
	return {
		id: faker.string.uuid(),
		authorId: author,
		title: faker.word.words({ count: { min: 1, max: 5 } }),
		description: faker.lorem.paragraph(4),
		instructions: faker.lorem.sentences({ min: 2, max: 8 }, '\n'),
		ingredients: faker.lorem.sentences({ min: 1, max: 8 }, '\n'),
		note: faker.lorem.paragraph({ min: 0, max: 2 }),
		yield: faker.number.int({ min: 1, max: 8 }),
		imageURL: faker.image.url({ width: 640, height: 480 }),
		preptime: faker.number.int({ min: 5, max: 180 }),
		cooktime: faker.number.int({ min: 5, max: 180 }),
		calories: faker.number.int({ min: 5, max: 500 }),
		fatcontent: faker.number.int({ min: 5, max: 180 })
	};
}

const users = [];
for (let i = 0; i < 3; i++) {
	const user = await createRandomUser();
	users.push(user);
}

const recipes = users.map((user) => {
	const recipelist = [];
	for (let i = 0; i < 3; i++) {
		const recipe = createRandomRecipe(user.id);
		recipelist.push(recipe);
	}
	return recipelist;
});

const flatRecipes = recipes.flat();
// console.log(flatRecipes);

await db.insert(user).values(users);
await db.insert(recipe).values(flatRecipes);

await client.end();
