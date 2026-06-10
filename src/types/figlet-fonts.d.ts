/**
 * figlet ships its importable fonts as untyped ESM modules whose default
 * export is the raw .flf font definition string. Declare them so the lazy
 * dynamic imports in the font generator are type-safe.
 */
declare module 'figlet/importable-fonts/*' {
  const fontData: string;
  export default fontData;
}
