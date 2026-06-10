/**
 * Font Generator — data & conversion engine
 *
 * "Fonts" here are not font files. They are Unicode codepoint substitution
 * tables (a -> 𝔞, b -> 𝔟, …) plus a handful of programmatic transforms
 * (case converters, combining-mark decorations) and lazily-loaded figlet
 * ASCII-art renderers. All conversion runs entirely in the browser.
 *
 * Original implementation for FreeConvert. No third-party app code or links.
 */

import type { Fonts } from 'figlet';

export type FontCategory = 'all' | 'fancy' | 'cursive' | 'bold' | 'cool' | 'glitch' | 'small' | 'wrappers' | 'lettercase' | 'textart';

export interface StyleMap {
  lower: string[]; // 26 entries a..z
  upper: string[]; // 26 entries A..Z
  digits?: string[]; // 10 entries 0..9 (optional)
}

export interface FontStyle {
  id: number;
  name: string;
  mainCategory: FontCategory;
  categories: FontCategory[];
  /** Unicode substitution map (mutually exclusive with transform / asciiFont). */
  map?: StyleMap;
  /** Programmatic transform that bypasses per-character substitution. */
  transform?: (input: string) => string;
  /** figlet font name — Text Art only (rendered asynchronously). */
  asciiFont?: Fonts;
  /** Optional decoration wrapped around the converted string. */
  prefix?: string;
  suffix?: string;
}

export const FONT_CATEGORIES: { id: FontCategory; labelKey: string }[] = [
  { id: 'all', labelKey: 'all' },
  { id: 'fancy', labelKey: 'fancy' },
  { id: 'cursive', labelKey: 'cursive' },
  { id: 'bold', labelKey: 'bold' },
  { id: 'cool', labelKey: 'cool' },
  { id: 'small', labelKey: 'small' },
  { id: 'glitch', labelKey: 'glitch' },
  { id: 'wrappers', labelKey: 'wrappers' },
  { id: 'lettercase', labelKey: 'lettercase' },
  { id: 'textart', labelKey: 'textart' },
];

export const STYLE_MAPS: Record<string, StyleMap> = {
  serifBold: {
    lower: ['𝐚', '𝐛', '𝐜', '𝐝', '𝐞', '𝐟', '𝐠', '𝐡', '𝐢', '𝐣', '𝐤', '𝐥', '𝐦', '𝐧', '𝐨', '𝐩', '𝐪', '𝐫', '𝐬', '𝐭', '𝐮', '𝐯', '𝐰', '𝐱', '𝐲', '𝐳'],
    upper: ['𝐀', '𝐁', '𝐂', '𝐃', '𝐄', '𝐅', '𝐆', '𝐇', '𝐈', '𝐉', '𝐊', '𝐋', '𝐌', '𝐍', '𝐎', '𝐏', '𝐐', '𝐑', '𝐒', '𝐓', '𝐔', '𝐕', '𝐖', '𝐗', '𝐘', '𝐙'],
    digits: ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'],
  },
  serifItalic: {
    lower: ['𝑎', '𝑏', '𝑐', '𝑑', '𝑒', '𝑓', '𝑔', 'ℎ', '𝑖', '𝑗', '𝑘', '𝑙', '𝑚', '𝑛', '𝑜', '𝑝', '𝑞', '𝑟', '𝑠', '𝑡', '𝑢', '𝑣', '𝑤', '𝑥', '𝑦', '𝑧'],
    upper: ['𝐴', '𝐵', '𝐶', '𝐷', '𝐸', '𝐹', '𝐺', '𝐻', '𝐼', '𝐽', '𝐾', '𝐿', '𝑀', '𝑁', '𝑂', '𝑃', '𝑄', '𝑅', '𝑆', '𝑇', '𝑈', '𝑉', '𝑊', '𝑋', '𝑌', '𝑍'],
  },
  serifBoldItalic: {
    lower: ['𝒂', '𝒃', '𝒄', '𝒅', '𝒆', '𝒇', '𝒈', '𝒉', '𝒊', '𝒋', '𝒌', '𝒍', '𝒎', '𝒏', '𝒐', '𝒑', '𝒒', '𝒓', '𝒔', '𝒕', '𝒖', '𝒗', '𝒘', '𝒙', '𝒚', '𝒛'],
    upper: ['𝑨', '𝑩', '𝑪', '𝑫', '𝑬', '𝑭', '𝑮', '𝑯', '𝑰', '𝑱', '𝑲', '𝑳', '𝑴', '𝑵', '𝑶', '𝑷', '𝑸', '𝑹', '𝑺', '𝑻', '𝑼', '𝑽', '𝑾', '𝑿', '𝒀', '𝒁'],
  },
  script: {
    lower: ['𝒶', '𝒷', '𝒸', '𝒹', 'ℯ', '𝒻', 'ℊ', '𝒽', '𝒾', '𝒿', '𝓀', '𝓁', '𝓂', '𝓃', 'ℴ', '𝓅', '𝓆', '𝓇', '𝓈', '𝓉', '𝓊', '𝓋', '𝓌', '𝓍', '𝓎', '𝓏'],
    upper: ['𝒜', 'ℬ', '𝒞', '𝒟', 'ℰ', 'ℱ', '𝒢', 'ℋ', 'ℐ', '𝒥', '𝒦', 'ℒ', 'ℳ', '𝒩', '𝒪', '𝒫', '𝒬', 'ℛ', '𝒮', '𝒯', '𝒰', '𝒱', '𝒲', '𝒳', '𝒴', '𝒵'],
  },
  boldScript: {
    lower: ['𝓪', '𝓫', '𝓬', '𝓭', '𝓮', '𝓯', '𝓰', '𝓱', '𝓲', '𝓳', '𝓴', '𝓵', '𝓶', '𝓷', '𝓸', '𝓹', '𝓺', '𝓻', '𝓼', '𝓽', '𝓾', '𝓿', '𝔀', '𝔁', '𝔂', '𝔃'],
    upper: ['𝓐', '𝓑', '𝓒', '𝓓', '𝓔', '𝓕', '𝓖', '𝓗', '𝓘', '𝓙', '𝓚', '𝓛', '𝓜', '𝓝', '𝓞', '𝓟', '𝓠', '𝓡', '𝓢', '𝓣', '𝓤', '𝓥', '𝓦', '𝓧', '𝓨', '𝓩'],
  },
  fraktur: {
    lower: ['𝔞', '𝔟', '𝔠', '𝔡', '𝔢', '𝔣', '𝔤', '𝔥', '𝔦', '𝔧', '𝔨', '𝔩', '𝔪', '𝔫', '𝔬', '𝔭', '𝔮', '𝔯', '𝔰', '𝔱', '𝔲', '𝔳', '𝔴', '𝔵', '𝔶', '𝔷'],
    upper: ['𝔄', '𝔅', 'ℭ', '𝔇', '𝔈', '𝔉', '𝔊', 'ℌ', 'ℑ', '𝔍', '𝔎', '𝔏', '𝔐', '𝔑', '𝔒', '𝔓', '𝔔', 'ℜ', '𝔖', '𝔗', '𝔘', '𝔙', '𝔚', '𝔛', '𝔜', 'ℨ'],
  },
  boldFraktur: {
    lower: ['𝖆', '𝖇', '𝖈', '𝖉', '𝖊', '𝖋', '𝖌', '𝖍', '𝖎', '𝖏', '𝖐', '𝖑', '𝖒', '𝖓', '𝖔', '𝖕', '𝖖', '𝖗', '𝖘', '𝖙', '𝖚', '𝖛', '𝖜', '𝖝', '𝖞', '𝖟'],
    upper: ['𝕬', '𝕭', '𝕮', '𝕯', '𝕰', '𝕱', '𝕲', '𝕳', '𝕴', '𝕵', '𝕶', '𝕷', '𝕸', '𝕹', '𝕺', '𝕻', '𝕼', '𝕽', '𝕾', '𝕿', '𝖀', '𝖁', '𝖂', '𝖃', '𝖄', '𝖅'],
  },
  doubleStruck: {
    lower: ['𝕒', '𝕓', '𝕔', '𝕕', '𝕖', '𝕗', '𝕘', '𝕙', '𝕚', '𝕛', '𝕜', '𝕝', '𝕞', '𝕟', '𝕠', '𝕡', '𝕢', '𝕣', '𝕤', '𝕥', '𝕦', '𝕧', '𝕨', '𝕩', '𝕪', '𝕫'],
    upper: ['𝔸', '𝔹', 'ℂ', '𝔻', '𝔼', '𝔽', '𝔾', 'ℍ', '𝕀', '𝕁', '𝕂', '𝕃', '𝕄', 'ℕ', '𝕆', 'ℙ', 'ℚ', 'ℝ', '𝕊', '𝕋', '𝕌', '𝕍', '𝕎', '𝕏', '𝕐', 'ℤ'],
    digits: ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'],
  },
  sans: {
    lower: ['𝖺', '𝖻', '𝖼', '𝖽', '𝖾', '𝖿', '𝗀', '𝗁', '𝗂', '𝗃', '𝗄', '𝗅', '𝗆', '𝗇', '𝗈', '𝗉', '𝗊', '𝗋', '𝗌', '𝗍', '𝗎', '𝗏', '𝗐', '𝗑', '𝗒', '𝗓'],
    upper: ['𝖠', '𝖡', '𝖢', '𝖣', '𝖤', '𝖥', '𝖦', '𝖧', '𝖨', '𝖩', '𝖪', '𝖫', '𝖬', '𝖭', '𝖮', '𝖯', '𝖰', '𝖱', '𝖲', '𝖳', '𝖴', '𝖵', '𝖶', '𝖷', '𝖸', '𝖹'],
    digits: ['𝟢', '𝟣', '𝟤', '𝟥', '𝟦', '𝟧', '𝟨', '𝟩', '𝟪', '𝟫'],
  },
  sansBold: {
    lower: ['𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺', '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇'],
    upper: ['𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝', '𝗞', '𝗟', '𝗠', '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧', '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭'],
    digits: ['𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'],
  },
  sansItalic: {
    lower: ['𝘢', '𝘣', '𝘤', '𝘥', '𝘦', '𝘧', '𝘨', '𝘩', '𝘪', '𝘫', '𝘬', '𝘭', '𝘮', '𝘯', '𝘰', '𝘱', '𝘲', '𝘳', '𝘴', '𝘵', '𝘶', '𝘷', '𝘸', '𝘹', '𝘺', '𝘻'],
    upper: ['𝘈', '𝘉', '𝘊', '𝘋', '𝘌', '𝘍', '𝘎', '𝘏', '𝘐', '𝘑', '𝘒', '𝘓', '𝘔', '𝘕', '𝘖', '𝘗', '𝘘', '𝘙', '𝘚', '𝘛', '𝘜', '𝘝', '𝘞', '𝘟', '𝘠', '𝘡'],
  },
  sansBoldItalic: {
    lower: ['𝙖', '𝙗', '𝙘', '𝙙', '𝙚', '𝙛', '𝙜', '𝙝', '𝙞', '𝙟', '𝙠', '𝙡', '𝙢', '𝙣', '𝙤', '𝙥', '𝙦', '𝙧', '𝙨', '𝙩', '𝙪', '𝙫', '𝙬', '𝙭', '𝙮', '𝙯'],
    upper: ['𝘼', '𝘽', '𝘾', '𝘿', '𝙀', '𝙁', '𝙂', '𝙃', '𝙄', '𝙅', '𝙆', '𝙇', '𝙈', '𝙉', '𝙊', '𝙋', '𝙌', '𝙍', '𝙎', '𝙏', '𝙐', '𝙑', '𝙒', '𝙓', '𝙔', '𝙕'],
  },
  mono: {
    lower: ['𝚊', '𝚋', '𝚌', '𝚍', '𝚎', '𝚏', '𝚐', '𝚑', '𝚒', '𝚓', '𝚔', '𝚕', '𝚖', '𝚗', '𝚘', '𝚙', '𝚚', '𝚛', '𝚜', '𝚝', '𝚞', '𝚟', '𝚠', '𝚡', '𝚢', '𝚣'],
    upper: ['𝙰', '𝙱', '𝙲', '𝙳', '𝙴', '𝙵', '𝙶', '𝙷', '𝙸', '𝙹', '𝙺', '𝙻', '𝙼', '𝙽', '𝙾', '𝙿', '𝚀', '𝚁', '𝚂', '𝚃', '𝚄', '𝚅', '𝚆', '𝚇', '𝚈', '𝚉'],
    digits: ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'],
  },
  circled: {
    lower: ['ⓐ', 'ⓑ', 'ⓒ', 'ⓓ', 'ⓔ', 'ⓕ', 'ⓖ', 'ⓗ', 'ⓘ', 'ⓙ', 'ⓚ', 'ⓛ', 'ⓜ', 'ⓝ', 'ⓞ', 'ⓟ', 'ⓠ', 'ⓡ', 'ⓢ', 'ⓣ', 'ⓤ', 'ⓥ', 'ⓦ', 'ⓧ', 'ⓨ', 'ⓩ'],
    upper: ['Ⓐ', 'Ⓑ', 'Ⓒ', 'Ⓓ', 'Ⓔ', 'Ⓕ', 'Ⓖ', 'Ⓗ', 'Ⓘ', 'Ⓙ', 'Ⓚ', 'Ⓛ', 'Ⓜ', 'Ⓝ', 'Ⓞ', 'Ⓟ', 'Ⓠ', 'Ⓡ', 'Ⓢ', 'Ⓣ', 'Ⓤ', 'Ⓥ', 'Ⓦ', 'Ⓧ', 'Ⓨ', 'Ⓩ'],
    digits: ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨'],
  },
  fullwidth: {
    lower: ['ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ', 'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ', 'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ'],
    upper: ['Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ', 'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ', 'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ'],
    digits: ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'],
  },
  negCircled: {
    lower: ['🅐', '🅑', '🅒', '🅓', '🅔', '🅕', '🅖', '🅗', '🅘', '🅙', '🅚', '🅛', '🅜', '🅝', '🅞', '🅟', '🅠', '🅡', '🅢', '🅣', '🅤', '🅥', '🅦', '🅧', '🅨', '🅩'],
    upper: ['🅐', '🅑', '🅒', '🅓', '🅔', '🅕', '🅖', '🅗', '🅘', '🅙', '🅚', '🅛', '🅜', '🅝', '🅞', '🅟', '🅠', '🅡', '🅢', '🅣', '🅤', '🅥', '🅦', '🅧', '🅨', '🅩'],
    digits: ['⓿', '❶', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾'],
  },
  squared: {
    lower: ['🄰', '🄱', '🄲', '🄳', '🄴', '🄵', '🄶', '🄷', '🄸', '🄹', '🄺', '🄻', '🄼', '🄽', '🄾', '🄿', '🅀', '🅁', '🅂', '🅃', '🅄', '🅅', '🅆', '🅇', '🅈', '🅉'],
    upper: ['🄰', '🄱', '🄲', '🄳', '🄴', '🄵', '🄶', '🄷', '🄸', '🄹', '🄺', '🄻', '🄼', '🄽', '🄾', '🄿', '🅀', '🅁', '🅂', '🅃', '🅄', '🅅', '🅆', '🅇', '🅈', '🅉'],
  },
  negSquared: {
    lower: ['🅰', '🅱', '🅲', '🅳', '🅴', '🅵', '🅶', '🅷', '🅸', '🅹', '🅺', '🅻', '🅼', '🅽', '🅾', '🅿', '🆀', '🆁', '🆂', '🆃', '🆄', '🆅', '🆆', '🆇', '🆈', '🆉'],
    upper: ['🅰', '🅱', '🅲', '🅳', '🅴', '🅵', '🅶', '🅷', '🅸', '🅹', '🅺', '🅻', '🅼', '🅽', '🅾', '🅿', '🆀', '🆁', '🆂', '🆃', '🆄', '🆅', '🆆', '🆇', '🆈', '🆉'],
  },
  parenthesized: {
    lower: ['⒜', '⒝', '⒞', '⒟', '⒠', '⒡', '⒢', '⒣', '⒤', '⒥', '⒦', '⒧', '⒨', '⒩', '⒪', '⒫', '⒬', '⒭', '⒮', '⒯', '⒰', '⒱', '⒲', '⒳', '⒴', '⒵'],
    upper: ['🄐', '🄑', '🄒', '🄓', '🄔', '🄕', '🄖', '🄗', '🄘', '🄙', '🄚', '🄛', '🄜', '🄝', '🄞', '🄟', '🄠', '🄡', '🄢', '🄣', '🄤', '🄥', '🄦', '🄧', '🄨', '🄩'],
    digits: ['0', '⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼'],
  },
  smallCaps: {
    lower: ['ᴀ', 'ʙ', 'ᴄ', 'ᴅ', 'ᴇ', 'ꜰ', 'ɢ', 'ʜ', 'ɪ', 'ᴊ', 'ᴋ', 'ʟ', 'ᴍ', 'ɴ', 'ᴏ', 'ᴘ', 'ǫ', 'ʀ', 'ꜱ', 'ᴛ', 'ᴜ', 'ᴠ', 'ᴡ', 'x', 'ʏ', 'ᴢ'],
    upper: ['ᴀ', 'ʙ', 'ᴄ', 'ᴅ', 'ᴇ', 'ꜰ', 'ɢ', 'ʜ', 'ɪ', 'ᴊ', 'ᴋ', 'ʟ', 'ᴍ', 'ɴ', 'ᴏ', 'ᴘ', 'ǫ', 'ʀ', 'ꜱ', 'ᴛ', 'ᴜ', 'ᴠ', 'ᴡ', 'x', 'ʏ', 'ᴢ'],
  },
  superscript: {
    lower: ['ᵃ', 'ᵇ', 'ᶜ', 'ᵈ', 'ᵉ', 'ᶠ', 'ᵍ', 'ʰ', 'ⁱ', 'ʲ', 'ᵏ', 'ˡ', 'ᵐ', 'ⁿ', 'ᵒ', 'ᵖ', 'q', 'ʳ', 'ˢ', 'ᵗ', 'ᵘ', 'ᵛ', 'ʷ', 'ˣ', 'ʸ', 'ᶻ'],
    upper: ['ᵃ', 'ᵇ', 'ᶜ', 'ᵈ', 'ᵉ', 'ᶠ', 'ᵍ', 'ʰ', 'ⁱ', 'ʲ', 'ᵏ', 'ˡ', 'ᵐ', 'ⁿ', 'ᵒ', 'ᵖ', 'q', 'ʳ', 'ˢ', 'ᵗ', 'ᵘ', 'ᵛ', 'ʷ', 'ˣ', 'ʸ', 'ᶻ'],
    digits: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'],
  },
  subscript: {
    lower: ['ₐ', 'b', 'c', 'd', 'ₑ', 'f', 'g', 'ₕ', 'ᵢ', 'ⱼ', 'ₖ', 'ₗ', 'ₘ', 'ₙ', 'ₒ', 'ₚ', 'q', 'ᵣ', 'ₛ', 'ₜ', 'ᵤ', 'ᵥ', 'w', 'ₓ', 'y', 'z'],
    upper: ['ₐ', 'b', 'c', 'd', 'ₑ', 'f', 'g', 'ₕ', 'ᵢ', 'ⱼ', 'ₖ', 'ₗ', 'ₘ', 'ₙ', 'ₒ', 'ₚ', 'q', 'ᵣ', 'ₛ', 'ₜ', 'ᵤ', 'ᵥ', 'w', 'ₓ', 'y', 'z'],
    digits: ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'],
  },
};

/* ----------------------------- code points ------------------------------ */
const DIGIT_MIN = 48; // '0'
const DIGIT_MAX = 57; // '9'
const UPPER_MIN = 65; // 'A'
const UPPER_MAX = 90; // 'Z'
const LOWER_MIN = 97; // 'a'
const LOWER_MAX = 122; // 'z'

function mapChar(map: StyleMap, char: string): string {
  const code = char.codePointAt(0);
  if (code === undefined) return char;
  if (code >= DIGIT_MIN && code <= DIGIT_MAX) {
    return map.digits && map.digits.length > 0 ? map.digits[code - DIGIT_MIN] : char;
  }
  if (code >= UPPER_MIN && code <= UPPER_MAX) return map.upper[code - UPPER_MIN];
  if (code >= LOWER_MIN && code <= LOWER_MAX) return map.lower[code - LOWER_MIN];
  return char; // spaces, punctuation, emoji, non-ASCII pass through
}

function mapString(map: StyleMap, text: string): string {
  let out = '';
  // Use the iterator so surrogate pairs in the input are not split.
  for (const ch of text) out += mapChar(map, ch);
  return out;
}

/* ------------------------- programmatic transforms ----------------------- */
export function upperCase(input: string): string {
  return input.toUpperCase();
}
export function lowerCase(input: string): string {
  return input.toLowerCase();
}
export function sentenceCase(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}
export function titleCase(input: string): string {
  return input.toLowerCase().replace(/(^|\s)(\S)/g, (_m, sep, ch) => sep + ch.toUpperCase());
}
function isUpper(letter: string): boolean {
  return letter.toUpperCase() === letter && letter.toLowerCase() !== letter;
}
export function alternatingCase(input: string): string {
  const startUpper = input.length > 0 && isUpper(input[0]);
  let res = '';
  for (let i = 0; i < input.length; i++) {
    const even = i % 2 === 0;
    res += (startUpper ? even : !even) ? input[i].toUpperCase() : input[i].toLowerCase();
  }
  return res;
}
export function inverseCase(input: string): string {
  let res = '';
  for (const ch of input) res += isUpper(ch) ? ch.toLowerCase() : ch.toUpperCase();
  return res;
}
export function pascalCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(?:^|\s)(\S)/g, (_m, ch) => ch.toUpperCase())
    .replace(/\s+/g, '');
}
export function camelCase(input: string): string {
  const pascal = pascalCase(input);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
export function snakeCase(input: string): string {
  return input.trim().replace(/\s+/g, '_');
}
export function kebabCase(input: string): string {
  return input.trim().replace(/\s+/g, '-');
}
export function reverseText(input: string): string {
  return [...input].reverse().join('');
}
export function removePunctuation(input: string): string {
  return input.replace(/[^\w\s]|_/g, '');
}
export function spaceOut(input: string): string {
  return [...input].join(' ');
}

/* combining-mark decorations (deterministic) */
function combine(input: string, mark: string): string {
  let out = '';
  for (const ch of input) {
    out += ch;
    if (ch !== ' ') out += mark;
  }
  return out;
}
export const strikethrough = (s: string) => combine(s, '̶');
export const underline = (s: string) => combine(s, '̲');
export const slashThrough = (s: string) => combine(s, '̷');

/* upside-down (flip) */
const FLIP_MAP: Record<string, string> = {
  a: 'ɐ',
  b: 'q',
  c: 'ɔ',
  d: 'p',
  e: 'ǝ',
  f: 'ɟ',
  g: 'ƃ',
  h: 'ɥ',
  i: 'ᴉ',
  j: 'ɾ',
  k: 'ʞ',
  l: 'l',
  m: 'ɯ',
  n: 'u',
  o: 'o',
  p: 'd',
  q: 'b',
  r: 'ɹ',
  s: 's',
  t: 'ʇ',
  u: 'n',
  v: 'ʌ',
  w: 'ʍ',
  x: 'x',
  y: 'ʎ',
  z: 'z',
  A: '∀',
  B: 'ᗺ',
  C: 'Ɔ',
  D: 'ᗡ',
  E: 'Ǝ',
  F: 'Ⅎ',
  G: '⅁',
  H: 'H',
  I: 'I',
  J: 'ſ',
  K: 'ʞ',
  L: '˥',
  M: 'W',
  N: 'N',
  O: 'O',
  P: 'Ԁ',
  Q: 'Q',
  R: 'ᴚ',
  S: 'S',
  T: '┴',
  U: '∩',
  V: 'Λ',
  W: 'M',
  X: 'X',
  Y: '⅄',
  Z: 'Z',
  '0': '0',
  '1': 'Ɩ',
  '2': 'ᄅ',
  '3': 'Ɛ',
  '4': 'ㄣ',
  '5': 'ϛ',
  '6': '9',
  '7': 'ㄥ',
  '8': '8',
  '9': '6',
  '.': '˙',
  ',': "'",
  '?': '¿',
  '!': '¡',
  '"': ',,',
  "'": ',',
  '(': ')',
  ')': '(',
  '[': ']',
  ']': '[',
  '{': '}',
  '}': '{',
  '<': '>',
  '>': '<',
  '&': '⅋',
  _: '‾',
};
export function upsideDown(input: string): string {
  let out = '';
  for (const ch of input) out += FLIP_MAP[ch] || ch;
  return [...out].reverse().join('');
}

/* deterministic "glitch" / zalgo decorations */
const ZALGO_UP = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓', '̈́', '͊', '͋', '͌', '̃', '̂', '̌', '͐'];
const ZALGO_MID = ['̕', '̛', '̀', '́', '͘', '̡', '̢', '̧', '̨', '̴', '̵', '̶', '͏', '͜', '͝', '͞', '͟', '͠', '͢', '̸', '̷', '͡'];
const ZALGO_DOWN = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̭', '̮', '̯', '̰', '̱', '̲', '̳', '̹', '̺', '̻', '̼', 'ͅ'];
// Simple seeded PRNG so the same input always renders identically.
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}
function zalgo(input: string, up: number, mid: number, down: number): string {
  let out = '';
  let i = 0;
  for (const ch of input) {
    out += ch;
    if (ch === ' ') {
      i++;
      continue;
    }
    const rnd = seeded(ch.codePointAt(0)! + i * 131);
    for (let n = 0; n < up; n++) out += ZALGO_UP[Math.floor(rnd() * ZALGO_UP.length)];
    for (let n = 0; n < mid; n++) out += ZALGO_MID[Math.floor(rnd() * ZALGO_MID.length)];
    for (let n = 0; n < down; n++) out += ZALGO_DOWN[Math.floor(rnd() * ZALGO_DOWN.length)];
    i++;
  }
  return out;
}
export const glitchLight = (s: string) => zalgo(s, 1, 0, 1);
export const glitchMedium = (s: string) => zalgo(s, 2, 1, 2);
export const glitchHeavy = (s: string) => zalgo(s, 4, 2, 4);

/* -------------------------------- figlet -------------------------------- */
type Figlet = typeof import('figlet');
let figletLoader: Promise<Figlet> | null = null;

const ASCII_FONT_IMPORTS: Record<string, () => Promise<{ default: string }>> = {
  Standard: () => import('figlet/importable-fonts/Standard.js'),
  Big: () => import('figlet/importable-fonts/Big.js'),
  Slant: () => import('figlet/importable-fonts/Slant.js'),
  Small: () => import('figlet/importable-fonts/Small.js'),
  Ogre: () => import('figlet/importable-fonts/Ogre.js'),
  'ANSI Shadow': () => import('figlet/importable-fonts/ANSI Shadow.js'),
  '3D-ASCII': () => import('figlet/importable-fonts/3D-ASCII.js'),
  Bulbhead: () => import('figlet/importable-fonts/Bulbhead.js'),
  Doom: () => import('figlet/importable-fonts/Doom.js'),
  Banner: () => import('figlet/importable-fonts/Banner.js'),
  Block: () => import('figlet/importable-fonts/Block.js'),
  Shadow: () => import('figlet/importable-fonts/Shadow.js'),
  Mini: () => import('figlet/importable-fonts/Mini.js'),
};

async function loadFiglet() {
  if (!figletLoader) {
    figletLoader = (async () => {
      const mod = await import('figlet');
      // figlet is published as CommonJS; the instance may sit on `.default`
      // depending on interop, so fall back to the namespace itself.
      const figlet = ((mod as { default?: Figlet }).default ?? mod) as Figlet;
      await Promise.all(
        Object.entries(ASCII_FONT_IMPORTS).map(async ([name, load]) => {
          const mod = await load();
          figlet.parseFont(name, mod.default);
        }),
      );
      return figlet;
    })();
  }
  return figletLoader;
}

export async function renderAsciiArt(font: Fonts, text: string): Promise<string> {
  const figlet = await loadFiglet();
  const source = text.trim() || 'Hello';
  return new Promise<string>((resolve, reject) => {
    figlet.text(source, { font }, (err: Error | null, data?: string) => {
      if (err || !data) return reject(err);
      resolve(data);
    });
  });
}

/* --------------------------- public conversion -------------------------- */
/** Synchronous conversion for map / transform fonts (NOT Text Art). */
export function convert(font: FontStyle, text: string): string {
  if (!text) return '';
  let body: string;
  if (font.transform) body = font.transform(text);
  else if (font.map) body = mapString(font.map, text);
  else body = text;
  return `${font.prefix || ''}${body}${font.suffix || ''}`;
}

export function isTextArt(font: FontStyle): boolean {
  return font.mainCategory === 'textart';
}

export function getFontsByCategory(category: FontCategory): FontStyle[] {
  if (category === 'all') return FONT_STYLES;
  return FONT_STYLES.filter(f => f.categories.includes(category));
}

export const FONT_STYLES: FontStyle[] = [
  { id: 0, name: 'Bold', mainCategory: 'bold', categories: ['bold', 'fancy'], map: STYLE_MAPS.serifBold },
  { id: 1, name: 'Bold Italic', mainCategory: 'bold', categories: ['bold', 'cursive'], map: STYLE_MAPS.serifBoldItalic },
  { id: 2, name: 'Italic', mainCategory: 'cursive', categories: ['cursive', 'fancy'], map: STYLE_MAPS.serifItalic },
  { id: 3, name: 'Cursive Script', mainCategory: 'cursive', categories: ['cursive', 'fancy'], map: STYLE_MAPS.script },
  { id: 4, name: 'Bold Script', mainCategory: 'cursive', categories: ['cursive', 'bold', 'fancy'], map: STYLE_MAPS.boldScript },
  { id: 5, name: 'Fraktur', mainCategory: 'fancy', categories: ['fancy'], map: STYLE_MAPS.fraktur },
  { id: 6, name: 'Bold Fraktur', mainCategory: 'fancy', categories: ['fancy', 'bold'], map: STYLE_MAPS.boldFraktur },
  { id: 7, name: 'Double Struck', mainCategory: 'cool', categories: ['cool', 'fancy'], map: STYLE_MAPS.doubleStruck },
  { id: 8, name: 'Sans Serif', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.sans },
  { id: 9, name: 'Sans Bold', mainCategory: 'bold', categories: ['bold'], map: STYLE_MAPS.sansBold },
  { id: 10, name: 'Sans Italic', mainCategory: 'cursive', categories: ['cursive'], map: STYLE_MAPS.sansItalic },
  { id: 11, name: 'Sans Bold Italic', mainCategory: 'bold', categories: ['bold', 'cursive'], map: STYLE_MAPS.sansBoldItalic },
  { id: 12, name: 'Monospace', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.mono },
  { id: 13, name: 'Bubbles', mainCategory: 'cool', categories: ['cool', 'wrappers'], map: STYLE_MAPS.circled },
  { id: 14, name: 'Dark Bubbles', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.negCircled },
  { id: 15, name: 'Squared', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.squared },
  { id: 16, name: 'Dark Squared', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.negSquared },
  { id: 17, name: 'Parenthesized', mainCategory: 'fancy', categories: ['fancy'], map: STYLE_MAPS.parenthesized },
  { id: 18, name: 'Full Width', mainCategory: 'cool', categories: ['cool'], map: STYLE_MAPS.fullwidth },
  { id: 19, name: 'Small Caps', mainCategory: 'small', categories: ['small'], map: STYLE_MAPS.smallCaps },
  { id: 20, name: 'Superscript', mainCategory: 'small', categories: ['small'], map: STYLE_MAPS.superscript },
  { id: 21, name: 'Subscript', mainCategory: 'small', categories: ['small'], map: STYLE_MAPS.subscript },
  { id: 22, name: 'Strikethrough', mainCategory: 'fancy', categories: ['fancy'], transform: strikethrough },
  { id: 23, name: 'Underline', mainCategory: 'fancy', categories: ['fancy'], transform: underline },
  { id: 24, name: 'Slashed', mainCategory: 'fancy', categories: ['fancy'], transform: slashThrough },
  { id: 25, name: 'Upside Down', mainCategory: 'cool', categories: ['cool'], transform: upsideDown },
  { id: 26, name: 'Spaced Out', mainCategory: 'cool', categories: ['cool', 'wrappers'], transform: spaceOut },
  { id: 27, name: 'Glitch (Light)', mainCategory: 'glitch', categories: ['glitch'], transform: glitchLight },
  { id: 28, name: 'Glitch (Medium)', mainCategory: 'glitch', categories: ['glitch'], transform: glitchMedium },
  { id: 29, name: 'Glitch (Heavy)', mainCategory: 'glitch', categories: ['glitch'], transform: glitchHeavy },
  { id: 30, name: 'Sparkles', mainCategory: 'wrappers', categories: ['wrappers', 'cool'], prefix: '✦ ', suffix: ' ✦' },
  { id: 31, name: 'Hearts', mainCategory: 'wrappers', categories: ['wrappers'], prefix: '♡ ', suffix: ' ♡' },
  { id: 32, name: 'Stars', mainCategory: 'wrappers', categories: ['wrappers'], prefix: '★彡 ', suffix: ' 彡★' },
  { id: 33, name: 'Flowers', mainCategory: 'wrappers', categories: ['wrappers'], prefix: '❀ ', suffix: ' ❀' },
  { id: 34, name: 'Wave Brackets', mainCategory: 'wrappers', categories: ['wrappers'], prefix: '「', suffix: '」' },
  { id: 35, name: 'Arrows', mainCategory: 'wrappers', categories: ['wrappers'], prefix: '➶ ', suffix: ' ➷' },
  { id: 36, name: 'UPPERCASE', mainCategory: 'lettercase', categories: ['lettercase'], transform: upperCase },
  { id: 37, name: 'lowercase', mainCategory: 'lettercase', categories: ['lettercase'], transform: lowerCase },
  { id: 38, name: 'Sentence case', mainCategory: 'lettercase', categories: ['lettercase'], transform: sentenceCase },
  { id: 39, name: 'Title Case', mainCategory: 'lettercase', categories: ['lettercase'], transform: titleCase },
  { id: 40, name: 'aLtErNaTiNg cAsE', mainCategory: 'lettercase', categories: ['lettercase'], transform: alternatingCase },
  { id: 41, name: 'InVeRsE cAsE', mainCategory: 'lettercase', categories: ['lettercase'], transform: inverseCase },
  { id: 42, name: 'PascalCase', mainCategory: 'lettercase', categories: ['lettercase'], transform: pascalCase },
  { id: 43, name: 'camelCase', mainCategory: 'lettercase', categories: ['lettercase'], transform: camelCase },
  { id: 44, name: 'snake_case', mainCategory: 'lettercase', categories: ['lettercase'], transform: snakeCase },
  { id: 45, name: 'kebab-case', mainCategory: 'lettercase', categories: ['lettercase'], transform: kebabCase },
  { id: 46, name: 'Reverse Text', mainCategory: 'lettercase', categories: ['lettercase'], transform: reverseText },
  { id: 47, name: 'Remove Punctuation', mainCategory: 'lettercase', categories: ['lettercase'], transform: removePunctuation },
  { id: 48, name: 'ASCII — Standard', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Standard' },
  { id: 49, name: 'ASCII — Big', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Big' },
  { id: 50, name: 'ASCII — Slant', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Slant' },
  { id: 51, name: 'ASCII — Small', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Small' },
  { id: 52, name: 'ASCII — Ogre', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Ogre' },
  { id: 53, name: 'ASCII — ANSI Shadow', mainCategory: 'textart', categories: ['textart'], asciiFont: 'ANSI Shadow' },
  { id: 54, name: 'ASCII — 3D-ASCII', mainCategory: 'textart', categories: ['textart'], asciiFont: '3D-ASCII' },
  { id: 55, name: 'ASCII — Bulbhead', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Bulbhead' },
  { id: 56, name: 'ASCII — Doom', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Doom' },
  { id: 57, name: 'ASCII — Banner', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Banner' },
  { id: 58, name: 'ASCII — Block', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Block' },
  { id: 59, name: 'ASCII — Shadow', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Shadow' },
  { id: 60, name: 'ASCII — Mini', mainCategory: 'textart', categories: ['textart'], asciiFont: 'Mini' },
];
