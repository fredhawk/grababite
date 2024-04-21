import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgTable, smallint, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { generateId } from 'lucia';

const timestamps = {
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	})
		.notNull()
		.defaultNow()
};

export const user = pgTable('user', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	// github_id: integer('github_id').unique(),
	hashed_password: text('hashed_password').notNull(),
	username: text('username').unique().notNull(),
	...timestamps
});
//
// export const usersRelations = relations(users, ({ one, many }) => ({
// 	recipes: many(recipes),
// 	profile: one(profiles)
// }));
//
export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
//
// export const profiles = pgTable('profiles', {
// 	id: text('id')
// 		.notNull()
// 		.primaryKey()
// 		.$defaultFn(() => generateId(15)),
// 	userId: text('user_id')
// 		.notNull()
// 		.references(() => users.id),
// 	...timestamps
// });
//
// export const profilesRelations = relations(profiles, ({ one }) => ({
// 	user: one(users, {
// 		fields: [profiles.userId],
// 		references: [users.id]
// 	})
// }));
//
// export const recipes = pgTable('recipes', {
// 	id: text('id')
// 		.notNull()
// 		.primaryKey()
// 		.$defaultFn(() => generateId(15)),
// 	authorId: text('author_id')
// 		.notNull()
// 		.references(() => users.id, { onDelete: 'cascade' }),
// 	title: varchar('title', { length: 256 }).notNull(),
// 	description: text('description').notNull(),
// 	yield: smallint('yield').notNull(),
// 	imageURL: text('imageurl'),
// 	preptime: smallint('preptime'),
// 	cooktime: smallint('cooktime'),
// 	calories: smallint('calories'),
// 	fatcontent: smallint('fat'),
// 	published: boolean('published').notNull().default(false),
// 	publishedAt: timestamp('publishedAt', {
// 		withTimezone: true,
// 		mode: 'date',
// 		precision: 4
// 	}),
// 	...timestamps
// });
//
// export const recipesRelations = relations(recipes, ({ one, many }) => ({
// 	author: one(users, {
// 		fields: [recipes.authorId],
// 		references: [users.id]
// 	}),
// 	ingredients: many(ingredients),
// 	instructions: many(instructions),
// 	categories: many(categories)
// }));
//
// export const ingredients = pgTable('ingredients', {
// 	id: text('id')
// 		.notNull()
// 		.primaryKey()
// 		.$defaultFn(() => generateId(15)),
// 	recipeId: text('recipe_id')
// 		.notNull()
// 		.references(() => recipes.id, { onDelete: 'cascade' }),
// 	ingredient: text('ingredient').notNull(),
// 	...timestamps
// });
//
// export const ingredientsRelations = relations(ingredients, ({ one }) => ({
// 	recipe: one(recipes, {
// 		fields: [ingredients.recipeId],
// 		references: [recipes.id]
// 	})
// }));
//
// export const instructions = pgTable('instructions', {
// 	id: text('id')
// 		.notNull()
// 		.primaryKey()
// 		.$defaultFn(() => generateId(15)),
// 	recipeId: text('recipe_id')
// 		.notNull()
// 		.references(() => recipes.id, { onDelete: 'cascade' }),
// 	instruction: text('instruction').notNull(),
// 	...timestamps
// });
//
// export const instructionsRelations = relations(instructions, ({ one }) => ({
// 	recipe: one(recipes, {
// 		fields: [instructions.recipeId],
// 		references: [recipes.id]
// 	})
// }));
//
// export const categories = pgTable('categories', {
// 	id: text('id')
// 		.notNull()
// 		.primaryKey()
// 		.$defaultFn(() => generateId(15)),
// 	category: text('category').notNull(),
// 	recipeId: text('recipe_id')
// 		.notNull()
// 		.references(() => recipes.id, { onDelete: 'cascade' }),
// 	...timestamps
// });
//
// export const categoriesRelations = relations(categories, ({ one }) => ({
// 	recipe: one(recipes, {
// 		fields: [categories.recipeId],
// 		references: [recipes.id]
// 	})
// }));
