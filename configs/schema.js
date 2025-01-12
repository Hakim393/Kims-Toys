import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar().notNull(),
  price: integer().notNull(),
  description: text().notNull(),
  info: text(),
  category: varchar().notNull(),
  imageUrl: varchar().notNull(),
  createdBy: varchar("createdBy")
    .notNull()
    .references(() => usersTable.email),
  creatorImageUrl: text("creator_image_url"),
});

export const cartTable = pgTable("cart", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email")
    .notNull()
    .references(() => usersTable.email),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: integer().notNull().default(1),
});

export const orderTable = pgTable("order", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar("email")
    .notNull()
    .references(() => usersTable.email),
  productId: integer()
    .notNull()
    .references(() => productsTable.id),
  quantity: integer().notNull().default(1),
});
