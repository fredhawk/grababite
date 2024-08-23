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
	hashed_password: text('hashed_password').notNull(),
	email: text('email').unique().notNull(),
	role: text('role').notNull().default('user'),
	banned: boolean('banned').default(false),
	...timestamps
});

export const usersRelations = relations(user, ({ one, many }) => ({
	recipes: many(recipe)
}));

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

export const recipe = pgTable('recipe', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	authorId: text('author_id')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	title: varchar('title', { length: 256 }).notNull(),
	description: text('description').notNull(),
	instructions: text('instructions').notNull(),
	ingredients: text('ingredients').notNull(),
	note: text('note'),
	yield: smallint('yield').notNull(),
	imageURL: text('imageurl'),
	preptime: smallint('preptime'),
	cooktime: smallint('cooktime'),
	calories: smallint('calories'),
	fatcontent: smallint('fat'),
	published: boolean('published').notNull().default(false),
	publishedAt: timestamp('publishedAt', {
		withTimezone: true,
		mode: 'date',
		precision: 4
	}),
	...timestamps
});

export const recipesRelations = relations(recipe, ({ one }) => ({
	author: one(user, {
		fields: [recipe.authorId],
		references: [user.id]
	})
}));
