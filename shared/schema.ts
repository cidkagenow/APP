import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  opponentName: text("opponent_name").notNull(),
  opponentLogoUrl: text("opponent_logo_url").notNull(),
  isHome: boolean("is_home").default(true),
  date: timestamp("date").notNull(),
  stadium: text("stadium").notNull(),
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  attendance: text("attendance"),
  isFinished: boolean("is_finished").default(false),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMatchSchema = createInsertSchema(matches).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, createdAt: true });

export type Match = typeof matches.$inferSelect;
export type NewsItem = typeof news.$inferSelect;
