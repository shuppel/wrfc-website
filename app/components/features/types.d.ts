/// <reference types="react" />
/// <reference types="next" />

declare module 'next/font/google' {
  export interface FontOptions {
    weight?: string;
    subsets?: string[];
    display?: string;
  }

  export function Inter(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
  };

  export function Press_Start_2P(options: FontOptions): {
    className: string;
    style: { fontFamily: string };
  };
}

interface Game {
  id: string;
  name: string;
  sprite: string;
  background: string;
  summary: string;
} 