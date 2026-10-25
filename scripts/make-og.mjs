// 產生社群分享預覽圖 public/og.png（1200×630）。
// 文字改了就重跑：node scripts/make-og.mjs
// 需要系統有 Noto Sans TC（或改下面的 FONT）。sharp 來自 astro 的相依套件。
import sharp from "sharp";

// 與 src/data/site.ts 保持一致
const NAME = "陳昱甫醫師";
const SPECIALTY = "胃腸肝膽專科";
const SPECIALTY_EN = "Gastroenterology & Hepatology";
const TAGLINE = "胃腸鏡、幽門桿菌、脂肪肝的白話衛教";
const DOMAIN = "gidrchenyufu.com";
const FOOTNOTE = "附參考文獻與審閱日期";

// 與 src/styles/global.css 的 :root 一致
const BG = "#fbfaf7";
const INK = "#1f2a2e";
const MUTED = "#5d6b70";
const ACCENT = "#1f6f6b";
const ACCENT_SOFT = "#e6f1ef";

const FONT = "Noto Sans TC, Microsoft JhengHei, sans-serif";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="0" y="0" width="26" height="630" fill="${ACCENT}"/>
  <rect x="0" y="540" width="1200" height="90" fill="${ACCENT_SOFT}"/>
  <rect x="0" y="540" width="26" height="90" fill="${ACCENT}"/>
  <text x="96" y="232" font-family="${FONT}" font-size="104" font-weight="700" fill="${INK}">${esc(NAME)}</text>
  <text x="96" y="312" font-family="${FONT}" font-size="46" font-weight="700" fill="${ACCENT}">${esc(SPECIALTY)}</text>
  <text x="96" y="360" font-family="${FONT}" font-size="31" font-weight="400" fill="${MUTED}">${esc(SPECIALTY_EN)}</text>
  <rect x="96" y="388" width="124" height="5" fill="${ACCENT}"/>
  <text x="96" y="470" font-family="${FONT}" font-size="34" font-weight="400" fill="${INK}">${esc(TAGLINE)}</text>
  <text x="96" y="596" font-family="${FONT}" font-size="28" font-weight="400" fill="${ACCENT}">${esc(DOMAIN)}</text>
  <text x="1104" y="596" text-anchor="end" font-family="${FONT}" font-size="26" font-weight="400" fill="${MUTED}">${esc(FOOTNOTE)}</text>
</svg>`;

// librsvg 會依 density 放大，所以先以較高解析度點陣化再縮回 1200×630，
// 文字邊緣比直接輸出更平滑；尺寸必須與 Base.astro 的 og:image:width/height 一致。
await sharp(Buffer.from(svg), { density: 192 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9 })
  .toFile("public/og.png");
const meta = await sharp("public/og.png").metadata();
console.log(`public/og.png ${meta.width}×${meta.height}`);
