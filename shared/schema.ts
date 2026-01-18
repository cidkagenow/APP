import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  primaryColor: text("primary_color"),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(), // Forward, Midfielder, Defender, Goalkeeper
  number: integer("number").notNull(),
  imageUrl: text("image_url").notNull(),
  isFeatured: boolean("is_featured").default(false),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  opponentName: text("opponent_name").notNull(), // For simplicity, just storing name
  opponentLogoUrl: text("opponent_logo_url").notNull(),
  isHome: boolean("is_home").default(true),
  date: timestamp("date").notNull(),
  stadium: text("stadium").notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  isFinished: boolean("is_finished").default(false),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // in cents
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
});

// === SCHEMAS ===

export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertPlayerSchema = createInsertSchema(players).omit({ id: true });
export const insertMatchSchema = createInsertSchema(matches).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, createdAt: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });

// === TYPES ===

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type Player = typeof players.$inferSelect;
export type InsertPlayer = z.infer<typeof insertPlayerSchema>;

export type Match = typeof matches.$inferSelect;
export type InsertMatch = z.infer<typeof insertMatchSchema>;

export type NewsItem = typeof news.$inferSelect;
export type InsertNewsItem = z.infer<typeof insertNewsSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
