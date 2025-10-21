export interface FontOption {
  id: string;
  name: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace';
  weights: number[];
  cssFamily: string;
  importUrl: string;
}

export interface FontPairing {
  id: string;
  title: string;
  description: string;
  primaryFontId: string;
  secondaryFontId: string;
  category: string;
  useCases: string[];
  sampleText: {
    heading: string;
    body: string;
  };
  popular?: boolean;
}

export interface FontScaleRatio {
  id: string;
  label: string;
  ratio: number;
  description: string;
}

export const fontOptions: FontOption[] = [
  {
    id: 'inter',
    name: 'Inter',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800, 900],
    cssFamily: "'Inter', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
  },
  {
    id: 'roboto',
    name: 'Roboto',
    category: 'sans-serif',
    weights: [300, 400, 500, 700, 900],
    cssFamily: "'Roboto', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap',
  },
  {
    id: 'open-sans',
    name: 'Open Sans',
    category: 'sans-serif',
    weights: [300, 400, 600, 700, 800],
    cssFamily: "'Open Sans', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap',
  },
  {
    id: 'lato',
    name: 'Lato',
    category: 'sans-serif',
    weights: [300, 400, 700, 900],
    cssFamily: "'Lato', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap',
  },
  {
    id: 'merriweather',
    name: 'Merriweather',
    category: 'serif',
    weights: [300, 400, 700, 900],
    cssFamily: "'Merriweather', serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap',
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    category: 'serif',
    weights: [400, 500, 600, 700, 800, 900],
    cssFamily: "'Playfair Display', serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap',
  },
  {
    id: 'lora',
    name: 'Lora',
    category: 'serif',
    weights: [400, 500, 600, 700],
    cssFamily: "'Lora', serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap',
  },
  {
    id: 'pt-serif',
    name: 'PT Serif',
    category: 'serif',
    weights: [400, 700],
    cssFamily: "'PT Serif', serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap',
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800, 900],
    cssFamily: "'Poppins', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap',
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700, 800, 900],
    cssFamily: "'Montserrat', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap',
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    category: 'display',
    weights: [400],
    cssFamily: "'Bebas Neue', cursive",
    importUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
  },
  {
    id: 'oswald',
    name: 'Oswald',
    category: 'display',
    weights: [300, 400, 500, 600, 700],
    cssFamily: "'Oswald', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'fira-code',
    name: 'Fira Code',
    category: 'monospace',
    weights: [300, 400, 500, 600, 700],
    cssFamily: "'Fira Code', monospace",
    importUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap',
  },
  {
    id: 'jetbrains-mono',
    name: 'JetBrains Mono',
    category: 'monospace',
    weights: [300, 400, 500, 600, 700, 800],
    cssFamily: "'JetBrains Mono', monospace",
    importUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap',
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'sans-serif',
    weights: [300, 400, 500, 600, 700],
    cssFamily: "'Space Grotesk', sans-serif",
    importUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap',
  },
];

export const fontPairings: FontPairing[] = [
  {
    id: 'inter-merriweather',
    title: 'Inter + Merriweather',
    description: 'Modern sans-serif paired with classic serif for balanced readability',
    primaryFontId: 'inter',
    secondaryFontId: 'merriweather',
    category: 'Sans + Serif',
    useCases: ['Editorial', 'Blog', 'Documentation'],
    sampleText: {
      heading: 'The Future of Design',
      body: 'Typography is the craft of endowing human language with a durable visual form. Good typography establishes a visual hierarchy that guides readers through your content.',
    },
    popular: true,
  },
  {
    id: 'playfair-open-sans',
    title: 'Playfair Display + Open Sans',
    description: 'Elegant display serif with versatile sans-serif for sophisticated layouts',
    primaryFontId: 'playfair-display',
    secondaryFontId: 'open-sans',
    category: 'Sans + Serif',
    useCases: ['Editorial', 'Magazine', 'Fashion'],
    sampleText: {
      heading: 'Timeless Elegance',
      body: 'Every element in design speaks a language. When typography is done right, it becomes invisible yet powerfully communicates your message to the reader.',
    },
    popular: true,
  },
  {
    id: 'poppins-lora',
    title: 'Poppins + Lora',
    description: 'Geometric sans-serif harmonized with rounded serif for approachable content',
    primaryFontId: 'poppins',
    secondaryFontId: 'lora',
    category: 'Sans + Serif',
    useCases: ['Blog', 'Marketing', 'Corporate'],
    sampleText: {
      heading: 'Building Better Experiences',
      body: 'The art of typography lies in finding the perfect balance between form and function. Each letterform contributes to the overall harmony of the page.',
    },
  },
  {
    id: 'montserrat-pt-serif',
    title: 'Montserrat + PT Serif',
    description: 'Strong geometric sans with traditional serif for professional appearance',
    primaryFontId: 'montserrat',
    secondaryFontId: 'pt-serif',
    category: 'Sans + Serif',
    useCases: ['Corporate', 'Reports', 'Business'],
    sampleText: {
      heading: 'Strategic Innovation',
      body: 'Effective communication through typography requires understanding both the technical aspects and the emotional impact of letterforms on your audience.',
    },
    popular: true,
  },
  {
    id: 'space-grotesk-inter',
    title: 'Space Grotesk + Inter',
    description: 'Contemporary pairing for modern tech and startup branding',
    primaryFontId: 'space-grotesk',
    secondaryFontId: 'inter',
    category: 'Tech',
    useCases: ['Tech', 'Startup', 'SaaS'],
    sampleText: {
      heading: 'Next-Gen Solutions',
      body: 'Modern typography embraces both tradition and innovation. Finding the right typeface combination can elevate your brand and improve user experience.',
    },
  },
  {
    id: 'bebas-roboto',
    title: 'Bebas Neue + Roboto',
    description: 'Bold display font with clean sans-serif for high-impact designs',
    primaryFontId: 'bebas-neue',
    secondaryFontId: 'roboto',
    category: 'Creative',
    useCases: ['Poster', 'Sports', 'Events'],
    sampleText: {
      heading: 'UNLEASH YOUR POTENTIAL',
      body: 'Typography in design is more than just choosing pretty letters. It is a key component of user interface design and greatly affects the overall user experience.',
    },
  },
  {
    id: 'oswald-lato',
    title: 'Oswald + Lato',
    description: 'Condensed display with humanist sans for editorial strength',
    primaryFontId: 'oswald',
    secondaryFontId: 'lato',
    category: 'Editorial',
    useCases: ['News', 'Magazine', 'Publishing'],
    sampleText: {
      heading: 'Breaking News Today',
      body: 'Typography is the voice of your written content. The fonts you choose convey meaning beyond the words themselves, creating mood and atmosphere.',
    },
  },
  {
    id: 'fira-code-inter',
    title: 'Fira Code + Inter',
    description: 'Developer-friendly monospace with modern sans for technical content',
    primaryFontId: 'fira-code',
    secondaryFontId: 'inter',
    category: 'Tech',
    useCases: ['Documentation', 'Code', 'Developer'],
    sampleText: {
      heading: 'Clean Code Principles',
      body: 'const message = "Typography matters in code too. Readable code uses fonts designed for developers with features like ligatures and clear character distinction."',
    },
  },
];

export const fontScaleRatios: FontScaleRatio[] = [
  {
    id: 'minor-second',
    label: 'Minor Second',
    ratio: 1.067,
    description: 'Subtle, conservative scale for tight layouts',
  },
  {
    id: 'major-second',
    label: 'Major Second',
    ratio: 1.125,
    description: 'Gentle progression for body-heavy content',
  },
  {
    id: 'minor-third',
    label: 'Minor Third',
    ratio: 1.2,
    description: 'Balanced scale for general use',
  },
  {
    id: 'major-third',
    label: 'Major Third',
    ratio: 1.25,
    description: 'Clear hierarchy for UI components',
  },
  {
    id: 'perfect-fourth',
    label: 'Perfect Fourth',
    ratio: 1.333,
    description: 'Strong contrast for editorial layouts',
  },
  {
    id: 'augmented-fourth',
    label: 'Augmented Fourth',
    ratio: 1.414,
    description: 'Dramatic scale for bold designs',
  },
  {
    id: 'perfect-fifth',
    label: 'Perfect Fifth',
    ratio: 1.5,
    description: 'Classic scale with clear differentiation',
  },
  {
    id: 'golden-ratio',
    label: 'Golden Ratio',
    ratio: 1.618,
    description: 'Harmonious proportions from nature',
  },
  {
    id: 'major-sixth',
    label: 'Major Sixth',
    ratio: 1.667,
    description: 'Spacious scale for modern layouts',
  },
  {
    id: 'minor-seventh',
    label: 'Minor Seventh',
    ratio: 1.778,
    description: 'Wide range for display typography',
  },
  {
    id: 'major-seventh',
    label: 'Major Seventh',
    ratio: 1.875,
    description: 'Extreme contrast for landing pages',
  },
  {
    id: 'octave',
    label: 'Octave',
    ratio: 2,
    description: 'Maximum impact for hero sections',
  },
  {
    id: 'major-tenth',
    label: 'Major Tenth',
    ratio: 2.5,
    description: 'Bold headlines with dramatic scale',
  },
  {
    id: 'double-octave',
    label: 'Double Octave',
    ratio: 4,
    description: 'Extreme hierarchy for special cases',
  },
];

export function getFontById(id: string): FontOption | undefined {
  return fontOptions.find(font => font.id === id);
}

export function buildFontImportLink(fontIds: string[]): string {
  const fonts = fontIds.map(id => getFontById(id)).filter((font): font is FontOption => font !== undefined);

  if (fonts.length === 0) return '';

  const families = fonts
    .map(font => {
      const weights = font.weights.join(';');
      const familyName = font.name.replace(/ /g, '+');
      return `family=${familyName}:wght@${weights}`;
    })
    .join('&');

  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}

export function generateFontScale(baseSize: number, ratio: number, steps: number): { label: string; px: number; rem: number; clamp: string }[] {
  const scale = [];

  for (let i = steps - 1; i >= 0; i--) {
    const size = baseSize * Math.pow(ratio, i);
    const rem = size / 16;
    const minSize = size * 0.75;
    const maxSize = size;
    const clamp = `clamp(${minSize.toFixed(2)}px, ${(rem * 0.875).toFixed(3)}rem + 1vw, ${maxSize.toFixed(2)}px)`;

    const labels = ['H6', 'H5', 'H4', 'H3', 'H2', 'H1'];
    const labelIndex = steps - 1 - i;
    const label = labelIndex < labels.length ? labels[labelIndex] : `Level ${i + 1}`;

    scale.push({
      label,
      px: parseFloat(size.toFixed(2)),
      rem: parseFloat(rem.toFixed(3)),
      clamp,
    });
  }

  return scale.reverse();
}
