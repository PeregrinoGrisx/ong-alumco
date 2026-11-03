// Geometría de la flor del logo Alumco, normalizada a un rombo de radio 100
// centrado en (0, 0). Cada pieza es un "pétalo" que la animación puede abrir.

export type Color = 'azul' | 'coral' | 'ambar' | 'verde';

export interface Petalo {
  id: string;
  d: string;
  color: Color;
  // Centro aproximado de la pieza: desde ahí se pliega hacia el centro.
  cx: number;
  cy: number;
}

export const petalosLogo: Petalo[] = [
  { id: 'arriba', d: 'M0 -100 L33.6 -66.4 L-33.6 -66.4 Z', color: 'verde', cx: 0, cy: -77 },
  { id: 'ala-izq', d: 'M-100 0 L-33.6 -66.4 L-16.7 -31.3 Q-61.4 -25 -100 0 Z', color: 'coral', cx: -50, cy: -30 },
  { id: 'ala-der', d: 'M100 0 L33.6 -66.4 L16.7 -31.3 Q61.4 -25 100 0 Z', color: 'azul', cx: 50, cy: -30 },
  { id: 'medio-izq', d: 'M-100 0 L-34.5 0 L-67.3 32.7 Z', color: 'ambar', cx: -67, cy: 11 },
  { id: 'medio-der', d: 'M100 0 L34.5 0 L67.3 32.7 Z', color: 'coral', cx: 67, cy: 11 },
  { id: 'bajo-izq', d: 'M-67.3 32.7 L-16.7 32.7 L-33.6 66.4 Z', color: 'ambar', cx: -39, cy: 44 },
  { id: 'bajo-der', d: 'M67.3 32.7 L16.7 32.7 L33.6 66.4 Z', color: 'ambar', cx: 39, cy: 44 },
  { id: 'abajo', d: 'M-33.6 66.4 L33.6 66.4 L0 100 Z', color: 'verde', cx: 0, cy: 77 },
];

export const centroLogo = 'M0 -16.5 L16.7 0 L0 16.7 L-16.7 0 Z';
