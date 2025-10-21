import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  createdAt: number;
}

interface ColorStore {
  palettes: ColorPalette[];
  addPalette: (palette: Omit<ColorPalette, 'id' | 'createdAt'>) => void;
  removePalette: (id: string) => void;
  updatePalette: (id: string, updates: Partial<ColorPalette>) => void;
}

export const useColorStore = create<ColorStore>()(
  persist(
    set => ({
      palettes: [],
      addPalette: palette =>
        set(state => ({
          palettes: [
            ...state.palettes,
            {
              ...palette,
              id: `palette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: Date.now(),
            },
          ],
        })),
      removePalette: id =>
        set(state => ({
          palettes: state.palettes.filter(p => p.id !== id),
        })),
      updatePalette: (id, updates) =>
        set(state => ({
          palettes: state.palettes.map(p => (p.id === id ? { ...p, ...updates } : p)),
        })),
    }),
    {
      name: 'color-palettes-storage',
    },
  ),
);
