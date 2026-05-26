// app.jsx — root App: routing, cart state, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#e8946a", "#1d2236", "#f4ece1"],
  "theme": "warm",
  "density": "regular",
  "serif": "Instrument Serif",
  "sans": "Manrope",
  "accentName": "Sunset",
  "shopColumns": 4,
  "heroColumns": 3,
  "skyMood": "dawn",
  "showProcessStripe": true,
  "bigType": false
}/*EDITMODE-END*/;

const PALETTES = {
  Sunset:    ["#e8946a", "#1d2236", "#f4ece1"],
  Twilight:  ["#a86fb6", "#1a1c34", "#efe6db"],
  Sea:       ["#5e7b96", "#1f3a5f", "#eef2ee"],
  Citrus:    ["#d99a3a", "#2a3818", "#f6efe1"],
  Rose:      ["#d99a8a", "#3a2540", "#f5e9e4"],
  Olive:     ["#7a8a4d", "#2a2a18", "#efeadc"],
};

const SKY_PRESETS = {
  dawn:    "radial-gradient(120% 80% at 80% 0%, #d3c5b3 0%, transparent 50%), radial-gradient(120% 100% at 10% 100%, #f1c290 0%, transparent 45%), linear-gradient(180deg, #c6b8a4 0%, var(--bg) 70%)",
  dusk:    "radial-gradient(120% 80% at 80% 0%, #c46a48 0%, transparent 50%), radial-gradient(120% 100% at 10% 100%, #6a4d7a 0%, transparent 50%), linear-gradient(180deg, #3b3f6b 0%, var(--bg) 75%)",
  midnight:"radial-gradient(120% 80% at 30% 0%, #2a2848 0%, transparent 50%), radial-gradient(120% 100% at 90% 100%, #1e2540 0%, transparent 45%), linear-gradient(180deg, #0e1024 0%, var(--bg) 70%)",
  mist:    "radial-gradient(140% 90% at 50% 0%, #d4d7d2 0%, transparent 60%), linear-gradient(180deg, #c0c5c0 0%, var(--bg) 80%)",
};

const FONT_OPTIONS = [
  "Instrument Serif", "Cormorant Garamond", "DM Serif Display", "Playfair Display",
];
const SANS_OPTIONS = ["Manrope", "Be Vietnam Pro", "Plus Jakarta Sans", "Work Sans"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("home");
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("zaaos-cart") || "[]"); } catch { return []; }
  });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [lightbox, setLightbox] = React.useState(null);
  const [toast, setToast] = React.useState("");
  const [isCommission, setIsCommission] = React.useState(false);
  const [themeOverride, setThemeOverride] = React.useState(null); // for nav toggle

  React.useEffect(() => {
    try { localStorage.setItem("zaaos-cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  // Apply CSS variables from tweaks
  React.useEffect(() => {
    const root = document.documentElement;
    const [accent, ink, bg] = t.palette || TWEAK_DEFAULTS.palette;
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--accent-deep", shade(accent, -15));
    root.style.setProperty("--ink", ink);
    if (!themeOverride) root.style.setProperty("--bg", bg);
    root.style.setProperty("--serif", `"${t.serif}", serif`);
    root.style.setProperty("--sans", `"${t.sans}", system-ui, sans-serif`);
    document.body.setAttribute("data-density", t.density);
    document.body.setAttribute("data-theme", themeOverride || (t.theme === "warm" ? "" : t.theme));
    // sky
    const sky = document.querySelector(".hero-sky");
    if (sky) sky.style.background = SKY_PRESETS[t.skyMood] || SKY_PRESETS.dawn;
  });

  function shade(hex, pct) {
    const n = hex.replace("#", "");
    const num = parseInt(n, 16);
    let r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
    const f = pct / 100;
    r = Math.max(0, Math.min(255, Math.round(r + (f < 0 ? r : 255 - r) * Math.abs(f))));
    g = Math.max(0, Math.min(255, Math.round(g + (f < 0 ? g : 255 - g) * Math.abs(f))));
    b = Math.max(0, Math.min(255, Math.round(b + (f < 0 ? b : 255 - b) * Math.abs(f))));
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const total = cart.reduce((s, l) => {
    const a = CATALOG.find((x) => x.id === l.id);
    return s + (a ? a.price * l.qty : 0);
  }, 0);

  const addToCart = (id) => {
    setCart((c) => {
      const found = c.find((l) => l.id === id);
      if (found) return c.map((l) => l.id === id ? { ...l, qty: l.qty + 1 } : l);
      return [...c, { id, qty: 1 }];
    });
    const a = CATALOG.find((x) => x.id === id);
    setToast(`Added "${a.title}" to cart`);
  };
  const setQty = (id, qty) => {
    if (qty <= 0) return setCart((c) => c.filter((l) => l.id !== id));
    setCart((c) => c.map((l) => l.id === id ? { ...l, qty } : l));
  };
  const clearCart = () => setCart([]);

  // Route handler — commission-sent funnels to confirmation with isCommission flag
  const navigate = (r) => {
    if (r === "commission-sent") {
      setIsCommission(true);
      setRoute("confirmation");
    } else if (r === "checkout") {
      setIsCommission(false);
      setRoute("checkout");
    } else if (r === "confirmation") {
      setIsCommission(false);
      setRoute("confirmation");
    } else {
      setRoute(r);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const themeNow = themeOverride || (t.theme === "dusk" ? "dusk" : "warm");

  return (
    <div className="app">
      <Nav
        route={route}
        setRoute={navigate}
        cartCount={cartCount}
        onCartClick={() => setDrawerOpen(true)}
        theme={themeNow}
        onThemeToggle={() => setThemeOverride(themeNow === "dusk" ? "warm" : "dusk")}
      />

      {route === "home" && (
        <HomePage setRoute={navigate} openLightbox={setLightbox} addToCart={addToCart} tweaks={t} />
      )}
      {route === "shop" && (
        <ShopPage openLightbox={setLightbox} addToCart={addToCart} tweaks={t} />
      )}
      {route === "commission" && (
        <CommissionPage setRoute={navigate} />
      )}
      {route === "checkout" && (
        <CheckoutPage cart={cart} total={total} setRoute={navigate} clearCart={clearCart} />
      )}
      {route === "confirmation" && (
        <ConfirmationPage setRoute={navigate} isCommission={isCommission} />
      )}
      {route === "contact" && (
        <ContactPage setRoute={navigate} />
      )}

      <Footer setRoute={navigate} />

      <CartDrawer
        open={drawerOpen} onClose={() => setDrawerOpen(false)}
        cart={cart} setQty={setQty} removeItem={(id) => setQty(id, 0)}
        setRoute={navigate} total={total}
      />
      <Lightbox artwork={lightbox} onClose={() => setLightbox(null)} addToCart={addToCart} />
      <Toast message={toast} onClose={() => setToast("")} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Theme palette"
          value={t.palette}
          options={Object.values(PALETTES)}
          onChange={(v) => {
            const name = Object.entries(PALETTES).find(([k, p]) => p.join() === v.join())?.[0] || "Custom";
            setTweak({ palette: v, accentName: name });
          }}
        />
        <TweakRadio
          label="Mood"
          value={t.theme}
          options={["warm", "dusk"]}
          onChange={(v) => setTweak("theme", v)}
        />
        <TweakSelect
          label="Sky in hero"
          value={t.skyMood}
          options={["dawn", "dusk", "midnight", "mist"]}
          onChange={(v) => setTweak("skyMood", v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Display serif"
          value={t.serif}
          options={FONT_OPTIONS}
          onChange={(v) => setTweak("serif", v)}
        />
        <TweakSelect
          label="Body sans"
          value={t.sans}
          options={SANS_OPTIONS}
          onChange={(v) => setTweak("sans", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />
        <TweakSlider
          label="Shop columns"
          value={t.shopColumns}
          min={2} max={5} step={1}
          onChange={(v) => setTweak("shopColumns", v)}
        />
        <TweakSlider
          label="Home columns"
          value={t.heroColumns}
          min={2} max={4} step={1}
          onChange={(v) => setTweak("heroColumns", v)}
        />

        <TweakSection label="Quick jump" />
        <TweakButton label="Home" onClick={() => navigate("home")} />
        <TweakButton label="Shop" onClick={() => navigate("shop")} />
        <TweakButton label="Commission" onClick={() => navigate("commission")} />
        <TweakButton label="Checkout" onClick={() => navigate("checkout")} />
        <TweakButton label="Confirmation" onClick={() => navigate("confirmation")} />
        <TweakButton label="Contact" onClick={() => navigate("contact")} />

        <TweakSection label="Demo" />
        <TweakButton label="+ sample item to cart" onClick={() => addToCart(CATALOG[0].id)} />
        <TweakButton label="Clear cart" onClick={clearCart} secondary={true} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
