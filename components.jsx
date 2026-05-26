// components.jsx — Shared UI: Nav, Footer, CartDrawer, Lightbox, Toast

function Icon({ name, size = 18, ...props }) {
  const s = size;
  const sw = 1.5;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", ...props };
  if (name === "bag") return <svg {...common}><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>;
  if (name === "x") return <svg {...common}><path d="M6 6l12 12M6 18 18 6" /></svg>;
  if (name === "arrow-right") return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
  if (name === "arrow-left") return <svg {...common}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "minus") return <svg {...common}><path d="M5 12h14" /></svg>;
  if (name === "check") return <svg {...common}><path d="M5 13l4 4L19 7" /></svg>;
  if (name === "upload") return <svg {...common}><path d="M12 16V4M6 10l6-6 6 6M4 20h16" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>;
  if (name === "heart") return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" /></svg>;
  if (name === "moon") return <svg {...common}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>;
  if (name === "sun") return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
  if (name === "mail") return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></svg>;
  if (name === "sparkle") return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /></svg>;
  return null;
}

function Nav({ route, setRoute, cartCount, onCartClick, theme, onThemeToggle }) {
  const links = [
    ["home", "Home"],
    ["shop", "Shop"],
    ["commission", "Commission"],
    ["contact", "Contact"],
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="brand" onClick={(e) => { e.preventDefault(); setRoute("home"); }} href="#">
          Zaaos<span className="brand-dot" />
        </a>
        <div className="nav-links">
          {links.map(([k, label]) => (
            <a key={k} href="#" className={"nav-link " + (route === k ? "active" : "")}
              onClick={(e) => { e.preventDefault(); setRoute(k); }}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button className="nav-link" onClick={onThemeToggle} aria-label="Toggle theme" style={{ display: "inline-flex" }}>
            <Icon name={theme === "dusk" ? "sun" : "moon"} size={16} />
          </button>
          <button className="cart-btn" onClick={onCartClick}>
            <Icon name="bag" size={15} />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer({ setRoute }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 16 }}>Zaaos<span className="brand-dot" /></div>
            <p style={{ color: "var(--ink-soft)", fontSize: 14, maxWidth: 360, lineHeight: 1.65 }}>
              Original paintings, prints, and commissioned work by Zaarah. Studio based by the sea — pieces ship worldwide.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("shop"); }}>Originals</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("shop"); }}>Prints</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("shop"); }}>Digital</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("shop"); }}>Stickers</a></li>
            </ul>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("commission"); }}>Commission</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setRoute("contact"); }}>Contact</a></li>
              <li><a href="#">Shipping & care</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul>
              <li><a href="#"><Icon name="instagram" size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />@zaaos.studio</a></li>
              <li><a href="#"><Icon name="mail" size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />hello@zaaos.art</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Zaarah. All works pictured are the artist's own.</span>
          <span className="mono">Crafted with care</span>
        </div>
      </div>
    </footer>
  );
}

function CartDrawer({ open, onClose, cart, setQty, removeItem, setRoute, total }) {
  return (
    <React.Fragment>
      <div className={"drawer-backdrop " + (open ? "open" : "")} onClick={onClose} />
      <aside className={"drawer " + (open ? "open" : "")} aria-hidden={!open}>
        <div className="drawer-hd">
          <div>
            <div className="serif" style={{ fontSize: 24 }}>Your Cart</div>
            <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{cart.length} {cart.length === 1 ? "item" : "items"}</div>
          </div>
          <button className="lb-close" style={{ position: "static", width: 36, height: 36, background: "var(--bg)" }} onClick={onClose}>
            <Icon name="x" size={16} />
          </button>
        </div>
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div style={{ fontFamily: "var(--serif)", fontSize: 32, marginBottom: 8 }}>Empty</div>
              <div style={{ fontSize: 13, marginBottom: 24 }}>Quiet here. Find something you love.</div>
              <button className="btn btn-ghost" onClick={() => { onClose(); setRoute("shop"); }}>Browse the shop</button>
            </div>
          ) : (
            cart.map((line) => {
              const a = CATALOG.find((x) => x.id === line.id);
              if (!a) return null;
              const seedIdx = CATALOG.findIndex((x) => x.id === a.id);
              return (
                <div className="cart-row" key={line.id}>
                  <div className="cart-thumb"><ArtPlaceholder seed={seedIdx} /></div>
                  <div className="cart-info">
                    <div className="cart-name">{a.title}</div>
                    <div className="cart-sub">{a.medium}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginTop: "auto" }}>
                      <div className="qty">
                        <button onClick={() => setQty(line.id, line.qty - 1)}><Icon name="minus" size={12} /></button>
                        <span>{line.qty}</span>
                        <button onClick={() => setQty(line.id, line.qty + 1)}><Icon name="plus" size={12} /></button>
                      </div>
                      <div style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}>${(a.price * line.qty).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {cart.length > 0 && (
          <div className="drawer-ft">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontSize: 14 }}>
              <span>Subtotal</span>
              <span style={{ fontVariantNumeric: "tabular-nums" }}>${total.toLocaleString()}</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-mute)", marginBottom: 16 }}>Shipping calculated at checkout.</div>
            <button className="btn btn-primary btn-block" onClick={() => { onClose(); setRoute("checkout"); }}>
              Checkout <Icon name="arrow-right" size={14} />
            </button>
          </div>
        )}
      </aside>
    </React.Fragment>
  );
}

function Lightbox({ artwork, onClose, addToCart }) {
  const open = !!artwork;
  const seedIdx = artwork ? CATALOG.findIndex((x) => x.id === artwork.id) : 0;

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={"lb-back " + (open ? "open" : "")} onClick={onClose}>
      {artwork && (
        <React.Fragment>
          <button className="lb-close" onClick={onClose}><Icon name="x" size={18} /></button>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <div className="lb-image"><ArtPlaceholder seed={seedIdx} aspect="4/5" /></div>
            <div className="lb-side">
              <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>
                {artwork.category} · {artwork.year}
              </div>
              <h3>{artwork.title}</h3>
              <p>{artwork.blurb}</p>
              <div className="lb-meta">
                <div><span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Medium</span><span>{artwork.medium}</span></div>
                <div><span style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>Size</span><span>{artwork.size}</span></div>
              </div>
              <div className="lb-price">${artwork.price.toLocaleString()}</div>
              <button className="btn btn-accent btn-lg" onClick={() => { addToCart(artwork.id); onClose(); }}>
                Add to cart <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

function Toast({ message, onClose }) {
  React.useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2400);
    return () => clearTimeout(t);
  }, [message, onClose]);
  return (
    <div style={{
      position: "fixed", left: "50%", bottom: 32, transform: `translateX(-50%) translateY(${message ? 0 : 100}px)`,
      transition: "transform .35s cubic-bezier(.4,0,.2,1), opacity .25s",
      opacity: message ? 1 : 0, zIndex: 300,
      background: "var(--ink)", color: "var(--bg-elev)", padding: "12px 20px",
      borderRadius: 999, fontSize: 13, display: "flex", alignItems: "center", gap: 10,
      boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
    }}>
      <Icon name="check" size={14} /> {message}
    </div>
  );
}

Object.assign(window, { Icon, Nav, Footer, CartDrawer, Lightbox, Toast });
