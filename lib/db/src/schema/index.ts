import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const workDocsTable = pgTable("work_docs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull().default(""),
  date: text("date").notNull(),
  description: text("description").notNull().default(""),
  imageBefore: text("image_before"),
  imageProgress: text("image_progress"),
  imageAfter: text("image_after").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWorkDocSchema = createInsertSchema(workDocsTable).omit({
  id: true,
  createdAt: true,
});

export type InsertWorkDoc = z.infer<typeof insertWorkDocSchema>;
export type WorkDoc = typeof workDocsTable.$inferSelect;
