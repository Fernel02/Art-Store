// art.jsx — placeholder art generator + catalog data
// Generates dreamy sunset/atmospheric SVG placeholders so the gallery feels
// on-brand even before real art is dropped in.

function ArtPlaceholder({ seed = 0, label = "", aspect = "4/5", style = {} }) {
  // Deterministic palette pick from seed
  const palettes = [
    // Sunset
    ["#1d2236", "#3b3f6b", "#e89464", "#f0c590", "#fae3c8"],
    // Twilight ocean
    ["#0e1024", "#1f3a5f", "#3a6082", "#a8c4d4", "#e8d3b8"],
    // Dawn rose
    ["#2a1f3d", "#8a4865", "#d99a8a", "#f0c590", "#f7ddc2"],
    // Mediterranean
    ["#1f3a5f", "#5e7b96", "#d8a55c", "#e8946a", "#f4ece1"],
    // Olive dusk
    ["#1d2236", "#3d4029", "#7a7240", "#c4a358", "#e8d3a8"],
    // Mauve
    ["#1d1d2e", "#4a3a5e", "#8a6884", "#d9a5b8", "#f0d8d8"],
    // Storm
    ["#0f1322", "#2a2e44", "#5e6878", "#a0a8b0", "#d4cfc0"],
    // Citrus garden
    ["#2a3818, #3d5a28, #8a9a4d, #d99a3a, #f4ece1".split(",").map(s=>s.trim())[0], "#3d5a28", "#8a9a4d", "#e8946a", "#f4ece1"],
  ];
  const pal = palettes[seed % palettes.length];

  // Vary the composition by seed too
  const variant = seed % 5;
  const id = `pl-${seed}`;

  return (
    <div style={{ width: "100%", aspectRatio: aspect, position: "relative", overflow: "hidden", ...style }}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id={`${id}-sky`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={pal[0]} />
            <stop offset="35%" stopColor={pal[1]} />
            <stop offset="70%" stopColor={pal[2]} />
            <stop offset="100%" stopColor={pal[3]} />
          </linearGradient>
          <linearGradient id={`${id}-glow`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={pal[3]} stopOpacity="0.9" />
            <stop offset="60%" stopColor={pal[2]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={pal[2]} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${id}-sun`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pal[4]} stopOpacity="1" />
            <stop offset="60%" stopColor={pal[3]} stopOpacity="0.5" />
            <stop offset="100%" stopColor={pal[3]} stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-grain`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>

        <rect width="400" height="500" fill={`url(#${id}-sky)`} />

        {/* Soft clouds — horizontal blobs */}
        {variant !== 3 && (
          <g opacity="0.55">
            <ellipse cx="80" cy="120" rx="140" ry="22" fill={pal[1]} opacity="0.6" />
            <ellipse cx="320" cy="180" rx="180" ry="28" fill={pal[1]} opacity="0.45" />
            <ellipse cx="200" cy="260" rx="220" ry="20" fill={pal[1]} opacity="0.35" />
            <ellipse cx="100" cy="330" rx="160" ry="18" fill={pal[2]} opacity="0.3" />
          </g>
        )}

        {/* Sun / moon */}
        {variant === 0 && <circle cx="280" cy="320" r="180" fill={`url(#${id}-sun)`} />}
        {variant === 1 && <circle cx="120" cy="160" r="36" fill={pal[4]} opacity="0.8" />}
        {variant === 2 && <ellipse cx="200" cy="380" rx="280" ry="100" fill={`url(#${id}-sun)`} />}
        {variant === 4 && <circle cx="200" cy="220" r="240" fill={`url(#${id}-sun)`} opacity="0.6" />}

        {/* Horizon glow */}
        <rect y="320" width="400" height="180" fill={`url(#${id}-glow)`} />

        {/* Silhouette */}
        {variant === 0 && (
          <path d="M0,460 L0,440 L40,430 L80,420 L120,432 L160,418 L200,425 L240,415 L280,422 L320,410 L360,418 L400,412 L400,500 L0,500 Z" fill={pal[0]} />
        )}
        {variant === 1 && (
          <g fill={pal[0]}>
            <path d="M0,460 L40,440 L80,455 L120,435 L160,448 L200,438 L240,442 L280,432 L320,440 L360,430 L400,438 L400,500 L0,500 Z" />
            {/* trees */}
            <path d="M150,460 L155,420 L165,410 L175,420 L180,460 Z" />
            <path d="M250,460 L256,415 L268,400 L280,415 L286,460 Z" />
          </g>
        )}
        {variant === 2 && (
          <path d="M0,440 Q100,420 200,435 T400,430 L400,500 L0,500 Z" fill={pal[0]} opacity="0.9" />
        )}
        {variant === 3 && (
          <g>
            {/* Abstract field */}
            <rect y="380" width="400" height="120" fill={pal[0]} opacity="0.8" />
            <rect y="380" width="400" height="120" fill={`url(#${id}-glow)`} opacity="0.4" />
          </g>
        )}
        {variant === 4 && (
          <path d="M0,470 L100,450 L200,460 L300,448 L400,455 L400,500 L0,500 Z" fill={pal[0]} />
        )}

        {/* Subtle grain */}
        <rect width="400" height="500" filter={`url(#${id}-grain)`} opacity="0.4" />

        {/* Tiny brushstroke detail */}
        {variant === 2 && (
          <path d="M270,140 L320,120 L325,118" stroke={pal[4]} strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round" />
        )}
      </svg>
      {label && (
        <div style={{
          position: "absolute", bottom: 12, left: 14, fontFamily: "var(--mono)",
          fontSize: 9, letterSpacing: "0.15em", color: "rgba(255,255,255,0.55)",
          textTransform: "uppercase"
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

// ============ Catalog ============
const CATALOG = [
  { id: "a01", title: "After the Rain", category: "Original", medium: "Oil on canvas", size: "60 × 80 cm", price: 480, year: 2025, tag: "New",
    blurb: "Captured between two storms — the moment the field exhales and the colour returns to the sky." },
  { id: "a02", title: "Citrus Hour", category: "Original", medium: "Gouache on paper", size: "40 × 50 cm", price: 320, year: 2025,
    blurb: "A small white house under a heavy orange tree. Painted from a memory of Patmos." },
  { id: "a03", title: "Thirteen Minutes", category: "Print", medium: "Giclée print, ed. of 50", size: "A3", price: 65, year: 2026, tag: "Limited",
    blurb: "The window of light between the last birds and the first stars." },
  { id: "a04", title: "Slow Tide", category: "Original", medium: "Oil on linen", size: "80 × 100 cm", price: 720, year: 2024,
    blurb: "Studied over three weeks on a single stretch of coast." },
  { id: "a05", title: "Promenade, Dusk", category: "Print", medium: "Archival print", size: "30 × 40 cm", price: 48, year: 2025,
    blurb: "Open edition. Soft, melancholy, easy to live with." },
  { id: "a06", title: "Field Notes", category: "Digital", medium: "Digital download (4K)", size: "Digital file", price: 18, year: 2026,
    blurb: "A high-resolution file for personal printing or wallpapers." },
  { id: "a07", title: "Sunday Sea", category: "Original", medium: "Oil on board", size: "30 × 40 cm", price: 260, year: 2025,
    blurb: "Quick study from a balcony, finished in one sitting." },
  { id: "a08", title: "Almost Spring", category: "Sticker", medium: "Vinyl sticker pack", size: "Pack of 6", price: 12, year: 2026,
    blurb: "A little set for laptops, notebooks, water bottles, refrigerators." },
  { id: "a09", title: "Garden in Bloom", category: "Print", medium: "Giclée print, ed. of 25", size: "A2", price: 95, year: 2025, tag: "Limited",
    blurb: "From the orange tree series. Heavy paper, generous borders." },
  { id: "a10", title: "Quiet Window", category: "Original", medium: "Acrylic on panel", size: "50 × 70 cm", price: 410, year: 2025,
    blurb: "Light coming in through curtains, an old chair, nothing more." },
  { id: "a11", title: "Wayfinder", category: "Sticker", medium: "Holographic sticker", size: "Single, 8 cm", price: 6, year: 2026,
    blurb: "Tiny shooting-star sticker. Catches the light." },
  { id: "a12", title: "First Frost", category: "Digital", medium: "Digital download (4K)", size: "Digital file", price: 18, year: 2026,
    blurb: "Wallpaper-ready. Cool blues, copper undertones." },
];

const CATEGORIES = ["All", "Original", "Print", "Digital", "Sticker"];

Object.assign(window, { ArtPlaceholder, CATALOG, CATEGORIES });
