import { db } from "./db";
import {
  teams, players, matches, news, products,
  type Team, type InsertTeam,
  type Player, type InsertPlayer,
  type Match, type InsertMatch,
  type NewsItem, type InsertNewsItem,
  type Product, type InsertProduct
} from "@shared/schema";
import { eq, desc, asc } from "drizzle-orm";

export interface IStorage {
  // Teams
  getTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;

  // Players
  getPlayers(): Promise<Player[]>;
  getFeaturedPlayers(): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;

  // Matches
  getMatches(status?: 'upcoming' | 'finished'): Promise<Match[]>;
  createMatch(match: InsertMatch): Promise<Match>;

  // News
  getNews(): Promise<NewsItem[]>;
  getNewsItem(id: number): Promise<NewsItem | undefined>;
  createNews(item: InsertNewsItem): Promise<NewsItem>;

  // Products
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  // Teams
  async getTeams(): Promise<Team[]> {
    return await db.select().from(teams);
  }
  async createTeam(team: InsertTeam): Promise<Team> {
    const [newTeam] = await db.insert(teams).values(team).returning();
    return newTeam;
  }

  // Players
  async getPlayers(): Promise<Player[]> {
    return await db.select().from(players).orderBy(asc(players.number));
  }
  async getFeaturedPlayers(): Promise<Player[]> {
    return await db.select().from(players).where(eq(players.isFeatured, true));
  }
  async createPlayer(player: InsertPlayer): Promise<Player> {
    const [newPlayer] = await db.insert(players).values(player).returning();
    return newPlayer;
  }

  // Matches
  async getMatches(status?: 'upcoming' | 'finished'): Promise<Match[]> {
    let query = db.select().from(matches);
    
    if (status === 'finished') {
      return await query.where(eq(matches.isFinished, true)).orderBy(desc(matches.date));
    } else if (status === 'upcoming') {
      return await query.where(eq(matches.isFinished, false)).orderBy(asc(matches.date));
    }
    
    return await query.orderBy(desc(matches.date));
  }
  async createMatch(match: InsertMatch): Promise<Match> {
    const [newMatch] = await db.insert(matches).values(match).returning();
    return newMatch;
  }

  // News
  async getNews(): Promise<NewsItem[]> {
    return await db.select().from(news).orderBy(desc(news.createdAt));
  }
  async getNewsItem(id: number): Promise<NewsItem | undefined> {
    const [item] = await db.select().from(news).where(eq(news.id, id));
    return item;
  }
  async createNews(item: InsertNewsItem): Promise<NewsItem> {
    const [newItem] = await db.insert(news).values(item).returning();
    return newItem;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }
  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
