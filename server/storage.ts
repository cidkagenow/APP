import { db } from "./db";
import {
  matches, news,
  type Match, type NewsItem
} from "@shared/schema";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  getMatches(status?: 'upcoming' | 'finished'): Promise<Match[]>;
  createMatch(match: any): Promise<Match>;
  getNews(): Promise<NewsItem[]>;
  createNews(item: any): Promise<NewsItem>;
}

export class DatabaseStorage implements IStorage {
  async getMatches(status?: 'upcoming' | 'finished'): Promise<Match[]> {
    let query = db.select().from(matches);
    if (status === 'finished') {
      return await query.where(eq(matches.isFinished, true)).orderBy(desc(matches.date));
    } else if (status === 'upcoming') {
      return await query.where(eq(matches.isFinished, false)).orderBy(asc(matches.date));
    }
    return await query.orderBy(desc(matches.date));
  }
  async createMatch(match: any): Promise<Match> {
    const [newMatch] = await db.insert(matches).values(match).returning();
    return newMatch;
  }
  async getNews(): Promise<NewsItem[]> {
    return await db.select().from(news).orderBy(desc(news.createdAt));
  }
  async createNews(item: any): Promise<NewsItem> {
    const [newItem] = await db.insert(news).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
