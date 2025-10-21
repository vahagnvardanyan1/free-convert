import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';
import mixPlugin from 'colord/plugins/mix';

extend([namesPlugin, mixPlugin]);

export interface ColorFormats {
  hex: string;
  rgb: string;
  rgba: string;
  hsl: string;
  hsla: string;
  hsv: string;
}

export function convertColor(color: string): ColorFormats | null {
  try {
    const c = colord(color);
    if (!c.isValid()) return null;

    const rgb = c.toRgb();
    const hsl = c.toHsl();
    const hsv = c.toHsv();

    return {
      hex: c.toHex(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`,
      hsl: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`,
      hsla: `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a})`,
      hsv: `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`,
    };
  } catch {
    return null;
  }
}

export function generateGradient(startColor: string, endColor: string, steps: number = 5): string[] {
  const start = colord(startColor);
  const end = colord(endColor);

  if (!start.isValid() || !end.isValid()) return [];

  const colors: string[] = [];
  for (let i = 0; i < steps; i++) {
    const ratio = i / (steps - 1);
    const color = start.mix(end, ratio);
    colors.push(color.toHex());
  }

  return colors;
}

export function generateComplementary(color: string): string[] {
  const c = colord(color);
  if (!c.isValid()) return [];

  return [
    c.toHex(),
    c.rotate(180).toHex(), // Complementary
    c.rotate(120).toHex(), // Triadic 1
    c.rotate(240).toHex(), // Triadic 2
  ];
}

export function generateAnalogous(color: string): string[] {
  const c = colord(color);
  if (!c.isValid()) return [];

  return [c.rotate(-30).toHex(), c.toHex(), c.rotate(30).toHex()];
}

export function generateMonochromatic(color: string): string[] {
  const c = colord(color);
  if (!c.isValid()) return [];

  return [c.lighten(0.3).toHex(), c.lighten(0.15).toHex(), c.toHex(), c.darken(0.15).toHex(), c.darken(0.3).toHex()];
}

export function getContrastColor(backgroundColor: string): string {
  const c = colord(backgroundColor);
  return c.isDark() ? '#ffffff' : '#000000';
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}
