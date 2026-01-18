import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get("/api/matches", async (req, res) => {
    const status = req.query.status as 'upcoming' | 'finished' | undefined;
    const matches = await storage.getMatches(status);
    res.json(matches);
  });

  app.get("/api/news", async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  // await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingMatches = await storage.getMatches();
  if (existingMatches.length === 0) {
    // Recent match
    await storage.createMatch({
      opponentName: "Chelsea",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      isHome: false,
      date: new Date("2026-01-12"),
      stadium: "Build-Abri Stadium",
      homeScore: 1,
      awayScore: 5,
      attendance: "12 500",
      isFinished: true,
    });

    // Upcoming matches
    await storage.createMatch({
      opponentName: "Chelsea",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      isHome: false,
      date: new Date("2026-12-12"),
      stadium: "Build-Abri Stadium",
      isFinished: false,
    });

    // News
    for (let i = 0; i < 3; i++) {
      await storage.createNews({
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&h=400&fit=crop",
      });
    }
  }
}
