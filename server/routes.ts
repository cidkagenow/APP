import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Teams
  app.get(api.teams.list.path, async (req, res) => {
    const teams = await storage.getTeams();
    res.json(teams);
  });

  // Players
  app.get(api.players.list.path, async (req, res) => {
    const players = await storage.getPlayers();
    res.json(players);
  });

  app.get(api.players.featured.path, async (req, res) => {
    const players = await storage.getFeaturedPlayers();
    res.json(players);
  });

  // Matches
  app.get(api.matches.list.path, async (req, res) => {
    const status = req.query.status as 'upcoming' | 'finished' | undefined;
    const matches = await storage.getMatches(status);
    res.json(matches);
  });

  // News
  app.get(api.news.list.path, async (req, res) => {
    const news = await storage.getNews();
    res.json(news);
  });

  app.get(api.news.get.path, async (req, res) => {
    const item = await storage.getNewsItem(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'News item not found' });
    }
    res.json(item);
  });

  // Products
  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingTeams = await storage.getTeams();
  if (existingTeams.length === 0) {
    // 1. Teams
    const oxford = await storage.createTeam({
      name: "Oxford United",
      logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Oxford_United_FC_logo.svg/1200px-Oxford_United_FC_logo.svg.png",
      primaryColor: "#F1C40F",
    });

    // 2. Players
    await storage.createPlayer({
      name: "Cameron Brannagan",
      position: "Midfielder",
      number: 8,
      imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d6428?w=400&h=400&fit=crop",
      isFeatured: true
    });
    await storage.createPlayer({
      name: "Elliott Moore",
      position: "Defender",
      number: 5,
      imageUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop",
      isFeatured: true
    });
    await storage.createPlayer({
      name: "Marcus Browne",
      position: "Forward",
      number: 11,
      imageUrl: "https://images.unsplash.com/photo-1570498839593-e565b39455fc?w=400&h=400&fit=crop",
      isFeatured: true
    });
    await storage.createPlayer({
      name: "Simon Eastwood",
      position: "Goalkeeper",
      number: 13,
      imageUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&h=400&fit=crop",
      isFeatured: false
    });

    // 3. Matches
    // Recent
    await storage.createMatch({
      opponentName: "Chelsea",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
      isHome: false,
      date: new Date(Date.now() - 86400000 * 3), // 3 days ago
      stadium: "Stamford Bridge",
      homeScore: 1,
      awayScore: 5,
      isFinished: true,
    });
    await storage.createMatch({
      opponentName: "Arsenal",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
      isHome: true,
      date: new Date(Date.now() - 86400000 * 10), // 10 days ago
      stadium: "Kassam Stadium",
      homeScore: 0,
      awayScore: 3,
      isFinished: true,
    });

    // Upcoming
    await storage.createMatch({
      opponentName: "Manchester United",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
      isHome: true,
      date: new Date(Date.now() + 86400000 * 2), // 2 days from now
      stadium: "Kassam Stadium",
      isFinished: false,
    });
    await storage.createMatch({
      opponentName: "Liverpool",
      opponentLogoUrl: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      isHome: false,
      date: new Date(Date.now() + 86400000 * 9), 
      stadium: "Anfield",
      isFinished: false,
    });

    // 4. News
    await storage.createNews({
      title: "New Season Kit Launch",
      summary: "Oxford United reveals the new home and away kits for the upcoming season.",
      content: "The new kits feature a return to the classic yellow and blue...",
      imageUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=600&h=400&fit=crop"
    });
    await storage.createNews({
      title: "Stadium Expansion Plans",
      summary: "Club announces exciting new plans to increase stadium capacity.",
      content: "The proposed expansion will add 5,000 new seats...",
      imageUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=600&h=400&fit=crop"
    });
    await storage.createNews({
      title: "Youth Academy Success",
      summary: "U18s win the league title in dramatic fashion.",
      content: "A last-minute goal secured the trophy for our young stars...",
      imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop"
    });

    // 5. Products
    await storage.createProduct({
      name: "Home Jersey 23/24",
      price: 5500,
      category: "Kits",
      imageUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop"
    });
    await storage.createProduct({
      name: "Scarf",
      price: 1500,
      category: "Accessories",
      imageUrl: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=400&h=400&fit=crop"
    });
  }
}
