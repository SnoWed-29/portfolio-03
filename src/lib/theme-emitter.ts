// src/lib/theme-emitter.ts

// Define the shape of our color palettes
export const colorThemes = {
    hero: ['#E6E0FF', '#D4F0F0'],       // Lavender & Teal (Default)
    showcase: ['#ffc3a0', '#ffafbd'],   // Peach & Pink
    parallax: ['#2193b0', '#6dd5ed'],     // Deep & Light Blue
  };
  
  export type ThemeName = keyof typeof colorThemes;
  
  type EventHandler = (theme: ThemeName) => void;
  
  // Our simple, global event emitter object
  const themeEmitter = {
    events: {} as Record<string, EventHandler[]>,
  
    // Subscribe to an event
    on(event: string, callback: EventHandler) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    },
  
    // Publish an event
    emit(event: string, data: ThemeName) {
      if (!this.events[event]) return;
      this.events[event].forEach(callback => callback(data));
    },
  };
  
  // Export a single instance for the whole app to use
  export default themeEmitter;