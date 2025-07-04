// src/types/skill.ts
export interface Skill {
  id: string;
  name: string;
  level: number; // e.g., 1-5, or percentage (0-100)
  description: string;
  category?: string; // Optional: "Frontend", "Backend", "DevOps", "Database"
  prerequisites: string[]; // Array of skill IDs that must be unlocked first
  children: string[]; // Array of skill IDs that branch off from this one
}