import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
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

export const profileSettingsTable = pgTable("profile_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  summary: text("summary").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  linkedin: text("linkedin").notNull().default(""),
  pintarnya: text("pintarnya").notNull().default(""),
  glints: text("glints").notNull().default(""),
  jobstreet: text("jobstreet").notNull().default(""),
  kitalulus: text("kitalulus").notNull().default(""),
  siapkerja: text("siapkerja").notNull().default(""),
  instagram: text("instagram").notNull().default(""),
  tiktok: text("tiktok").notNull().default(""),
  telegram: text("telegram").notNull().default(""),
  facebook: text("facebook").notNull().default(""),
  posisiDilamar: text("posisi_dilamar").notNull().default("[]"),
  skills: text("skills").notNull().default("[]"),
  softSkills: text("soft_skills").notNull().default("[]"),
  additionalInfo: text("additional_info").notNull().default("[]"),
  profilePhoto: text("profile_photo"),
});

export const workExperiencesTable = pgTable("work_experiences", {
  id: serial("id").primaryKey(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  via: text("via"),
  employmentType: text("employment_type"),
  period: text("period").notNull(),
  location: text("location").notNull(),
  responsibilities: text("responsibilities").notNull().default("[]"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const certificatesTable = pgTable("certificates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull().default("Lainnya"),
  image: text("image").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWorkDocSchema = createInsertSchema(workDocsTable).omit({ id: true, createdAt: true });
export const insertExperienceSchema = createInsertSchema(workExperiencesTable).omit({ id: true, createdAt: true });
export const insertCertificateSchema = createInsertSchema(certificatesTable).omit({ id: true, createdAt: true });

export type InsertWorkDoc = z.infer<typeof insertWorkDocSchema>;
export type WorkDoc = typeof workDocsTable.$inferSelect;
export type WorkExperience = typeof workExperiencesTable.$inferSelect;
export type Certificate = typeof certificatesTable.$inferSelect;
export type ProfileSettings = typeof profileSettingsTable.$inferSelect;
