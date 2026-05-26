// pages.jsx — Page components: Home, Shop, Commission, Checkout, Confirmation, Contact

// ====================== HOME ======================
function HomePage({ setRoute, openLightbox, addToCart, tweaks }) {
  const featured = CATALOG.slice(0, 6);
  const hero = CATALOG[1]; // Citrus Hour

  return (
    <div className="page fade-in">
      <section className="hero">
        <div className="hero-sky" />
        <div className="container hero-inner">
          <div>
            <div className="eyebrow">Studio of Zaarah · 2026 Collection</div>
            <h1>
              Paintings<br />
              for slow<br />
              <em>evenings</em>.
            </h1>
            <p className="hero-lede">
              A small, considered catalogue of original works, limited prints, and commissioned pieces — made by hand,
              shipped from the studio with a handwritten note.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => setRoute("shop")}>
                Browse the shop <Icon name="arrow-right" size={14} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => setRoute("commission")}>
                Request a commission
              </button>
            </div>
          </div>
          <div className="hero-feature float" onClick={() => openLightbox(hero)} style={{ cursor: "zoom-in" }}>
            <ArtPlaceholder seed={1} aspect="4/5" label={hero.title} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-hd">
            <div>
              <div className="eyebrow">Featured</div>
              <h2>Recent works</h2>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="section-sub">A handful of pieces just back from the framer.</span>
              <button className="btn btn-ghost" onClick={() => setRoute("shop")}>See all</button>
            </div>
          </div>
          <div className={"grid grid-cols-" + (tweaks.heroColumns || 3)}>
            {featured.map((a, i) => (
              <ArtCard key={a.id} artwork={a} seedIdx={CATALOG.findIndex(x => x.id === a.id)} onOpen={() => openLightbox(a)} onAdd={() => addToCart(a.id)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "color-mix(in oklab, var(--bg-elev) 60%, var(--bg))", borderRadius: 0 }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div style={{ aspectRatio: "1/1", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow-lift)" }}>
              <ArtPlaceholder seed={4} aspect="1/1" />
            </div>
            <div>
              <div className="eyebrow">About the artist</div>
              <h2 className="serif" style={{ fontSize: "clamp(36px,5vw,56px)", lineHeight: 1.05, margin: "8px 0 24px" }}>
                Working in the<br /><em style={{ color: "var(--accent-deep)" }}>quiet hours</em>.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 16 }}>
                Zaarah paints from a small studio overlooking the sea. Her work is rooted in everyday observation —
                shifting light, garden walls, the colour of the sky thirteen minutes before sunset.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 32 }}>
                Each piece is one-of-a-kind. Prints are made in small editions, signed and numbered by the artist.
              </p>
              <button className="btn btn-primary" onClick={() => setRoute("commission")}>
                Commission a piece <Icon name="sparkle" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-hd">
            <div>
              <div className="eyebrow">Process</div>
              <h2>How a commission works</h2>
            </div>
          </div>
          <div className="grid grid-cols-4">
            {[
              ["01", "Tell the story", "Share the subject, mood, references — anything that helps."],
              ["02", "Sketch & quote", "Zaarah responds with a sketch and a fixed price."],
              ["03", "Studio time", "Two to four weeks. You'll get progress photos."],
              ["04", "Hand-shipped", "Signed, packed, sent with a handwritten note."],
            ].map(([n, t, d]) => (
              <div key={n} style={{ padding: "32px 0", borderTop: "1px solid var(--line)" }}>
                <div className="mono" style={{ color: "var(--accent-deep)", marginBottom: 24 }}>{n}</div>
                <div className="serif" style={{ fontSize: 28, marginBottom: 12 }}>{t}</div>
                <div style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>{d}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn btn-accent btn-lg" onClick={() => setRoute("commission")}>
              Start your commission <Icon name="arrow-right" size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ====================== ART CARD ======================
function ArtCard({ artwork, seedIdx, onOpen, onAdd }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div className="art-card" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="art-frame" onClick={onOpen} style={{ position: "relative" }}>
        <ArtPlaceholder seed={seedIdx} />
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center",
          padding: 16, opacity: hover ? 1 : 0, transition: "opacity .25s",
          background: "linear-gradient(0deg, rgba(15,17,28,0.6) 0%, transparent 50%)",
          pointerEvents: hover ? "auto" : "none",
        }}>
          <button className="btn btn-accent" onClick={(e) => { e.stopPropagation(); onAdd(); }}>
            Add to cart
          </button>
        </div>
      </div>
      <div className="art-meta">
        <div>
          <div className="art-title">{artwork.title}</div>
          <div className="art-sub">{artwork.medium}</div>
        </div>
        <div className="art-price">${artwork.price.toLocaleString()}</div>
      </div>
      {artwork.tag && (
        <div className="art-tags"><span className="tag tag-accent">{artwork.tag}</span><span className="tag">{artwork.category}</span></div>
      )}
    </div>
  );
}

// ====================== SHOP ======================
function ShopPage({ openLightbox, addToCart, tweaks }) {
  const [cat, setCat] = React.useState("All");
  const [sort, setSort] = React.useState("newest");
  const [search, setSearch] = React.useState("");

  let items = CATALOG.slice();
  if (cat !== "All") items = items.filter((a) => a.category === cat);
  if (search) items = items.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));
  if (sort === "price-asc") items.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items.sort((a, b) => b.price - a.price);
  if (sort === "newest") items.sort((a, b) => b.year - a.year);

  return (
    <div className="page fade-in">
      <section className="section-tight" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="eyebrow">The shop</div>
          <h1 className="serif" style={{ fontSize: "clamp(48px,7vw,84px)", lineHeight: 1, margin: "8px 0 24px", letterSpacing: "-0.02em" }}>
            Every piece, <em style={{ color: "var(--accent-deep)" }}>one of one</em>.
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 560 }}>
            Originals are unique. Prints come in small, signed editions. Digital downloads ship instantly.
            Stickers are for joy.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container">
          <div className="filters">
            {CATEGORIES.map((c) => (
              <button key={c} className={"chip " + (cat === c ? "active" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ position: "relative" }}>
                <Icon name="search" size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-mute)" }} />
                <input className="input" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
                  style={{ padding: "8px 14px 8px 34px", fontSize: 13, borderRadius: 999, width: 180 }} />
              </div>
              <select className="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price-asc">Price · low to high</option>
                <option value="price-desc">Price · high to low</option>
              </select>
            </div>
          </div>

          {items.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center", color: "var(--ink-mute)" }}>
              <div className="serif" style={{ fontSize: 32 }}>Nothing here yet.</div>
              <div style={{ fontSize: 14, marginTop: 8 }}>Try a different filter.</div>
            </div>
          ) : (
            <div className={"grid grid-cols-" + (tweaks.shopColumns || 4)}>
              {items.map((a) => (
                <ArtCard key={a.id} artwork={a} seedIdx={CATALOG.findIndex((x) => x.id === a.id)}
                  onOpen={() => openLightbox(a)} onAdd={() => addToCart(a.id)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ====================== COMMISSION ======================
function CommissionPage({ setRoute }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    type: "", size: "", refs: [], story: "", deadline: "",
    name: "", email: "", deposit: false,
  });
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const stepLabels = ["Type", "Size", "References", "Your story", "Deposit"];

  // Pricing rough estimate
  const sizePrices = { "Small": 280, "Medium": 480, "Large": 820, "Heroic": 1400 };
  const typeMul = { "Portrait": 1.2, "Landscape": 1.0, "Still life": 1.0, "Abstract": 0.9, "Pet": 1.1 };
  const basePrice = (sizePrices[data.size] || 0) * (typeMul[data.type] || 1);
  const deposit = Math.round(basePrice * 0.3);

  const next = () => setStep((s) => Math.min(stepLabels.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const canNext = () => {
    if (step === 0) return !!data.type;
    if (step === 1) return !!data.size;
    if (step === 2) return true; // refs optional
    if (step === 3) return !!data.story && !!data.name && !!data.email;
    return true;
  };

  const onFiles = (files) => {
    const arr = Array.from(files).slice(0, 5).map((f) => f.name);
    update("refs", [...data.refs, ...arr].slice(0, 6));
  };

  return (
    <div className="page fade-in">
      <section className="section-tight" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="eyebrow">Commission</div>
          <h1 className="serif" style={{ fontSize: "clamp(48px,7vw,84px)", lineHeight: 1, margin: "8px 0 24px", letterSpacing: "-0.02em" }}>
            Something <em style={{ color: "var(--accent-deep)" }}>made for you</em>.
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 560 }}>
            Five short steps. A non-binding sketch and quote follows within 48 hours.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container">
          <div className="commission">
            <div className="steps">
              {stepLabels.map((label, i) => (
                <div key={label}
                  className={"step " + (i === step ? "active" : i < step ? "done" : "")}
                  onClick={() => i <= step && setStep(i)}>
                  <div className="step-num">{i < step ? <Icon name="check" size={12} /> : i + 1}</div>
                  <div>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "var(--bg-elev)", borderRadius: "var(--radius-lg)", padding: "40px 48px", minHeight: 480 }}>
              {step === 0 && (
                <div className="fade-in" key="s0">
                  <div className="eyebrow">Step 1 of 5</div>
                  <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 8px", fontWeight: 400 }}>What kind of piece?</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Pick a starting point. You can change direction later.</p>
                  <div className="option-grid">
                    {[
                      ["Portrait", "Person or family"],
                      ["Landscape", "Place or scene"],
                      ["Still life", "Objects, flowers"],
                      ["Abstract", "Mood, colour, feeling"],
                      ["Pet", "Cats, dogs, hamsters"],
                    ].map(([t, sub]) => (
                      <button key={t} className={"option-card " + (data.type === t ? "selected" : "")} onClick={() => update("type", t)}>
                        <div className="oc-title">{t}</div>
                        <div className="oc-sub">{sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="fade-in" key="s1">
                  <div className="eyebrow">Step 2 of 5</div>
                  <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 8px", fontWeight: 400 }}>How big?</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Roughly. We'll firm up dimensions together.</p>
                  <div className="option-grid">
                    {[
                      ["Small", "20–30 cm", 280],
                      ["Medium", "40–60 cm", 480],
                      ["Large", "70–100 cm", 820],
                      ["Heroic", "100 cm+", 1400],
                    ].map(([t, sub, p]) => (
                      <button key={t} className={"option-card " + (data.size === t ? "selected" : "")} onClick={() => update("size", t)}>
                        <div className="oc-title">{t}</div>
                        <div className="oc-sub">{sub}</div>
                        <div className="oc-price">from ${p}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="fade-in" key="s2">
                  <div className="eyebrow">Step 3 of 5</div>
                  <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 8px", fontWeight: 400 }}>Reference images</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Photos, mood boards, other paintings you love. Up to 6. Optional, but helpful.</p>
                  <label className="dropzone">
                    <Icon name="upload" size={28} style={{ color: "var(--ink-mute)", marginBottom: 12 }} />
                    <div style={{ fontFamily: "var(--serif)", fontSize: 22 }}>Drag files here, or click to browse</div>
                    <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 6 }}>JPG, PNG, HEIC · max 10 MB each</div>
                    <input type="file" multiple accept="image/*" style={{ display: "none" }} onChange={(e) => onFiles(e.target.files)} />
                  </label>
                  {data.refs.length > 0 && (
                    <div className="upload-list">
                      {data.refs.map((r, i) => (
                        <div key={i} className="upload-pill">
                          {r}
                          <button onClick={() => update("refs", data.refs.filter((_, j) => j !== i))} style={{ color: "var(--ink-mute)" }}>
                            <Icon name="x" size={10} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="fade-in" key="s3">
                  <div className="eyebrow">Step 4 of 5</div>
                  <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 8px", fontWeight: 400 }}>The story</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Tell Zaarah what this piece is for, and how to reach you.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="field">
                      <label className="field-label">Your name</label>
                      <input className="input" value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Jane Doe" />
                    </div>
                    <div className="field">
                      <label className="field-label">Email</label>
                      <input className="input" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="field-label">Tell the story</label>
                    <textarea className="textarea" value={data.story} onChange={(e) => update("story", e.target.value)}
                      placeholder="A wedding gift? A view from a place you miss? The more you share, the better the piece." />
                  </div>
                  <div className="field">
                    <label className="field-label">Ideal delivery (optional)</label>
                    <input className="input" type="text" value={data.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder="e.g. before December" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="fade-in" key="s4">
                  <div className="eyebrow">Step 5 of 5</div>
                  <h2 className="serif" style={{ fontSize: 36, margin: "8px 0 8px", fontWeight: 400 }}>Reserve your slot</h2>
                  <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>
                    A 30% deposit holds your spot in the studio queue. Fully refundable until the first sketch is shared.
                  </p>
                  <div style={{ background: "var(--bg)", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid var(--line-soft)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
                      <div><div className="eyebrow">Type</div><div>{data.type || "—"}</div></div>
                      <div><div className="eyebrow">Size</div><div>{data.size || "—"}</div></div>
                      <div><div className="eyebrow">References</div><div>{data.refs.length} files</div></div>
                      <div><div className="eyebrow">For</div><div>{data.name || "—"}</div></div>
                    </div>
                    <div style={{ borderTop: "1px solid var(--line-soft)", marginTop: 20, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <div>
                        <div className="eyebrow">Estimated total</div>
                        <div className="serif" style={{ fontSize: 32 }}>${Math.round(basePrice).toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div className="eyebrow">Deposit (30%)</div>
                        <div className="serif" style={{ fontSize: 32, color: "var(--accent-deep)" }}>${deposit.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 24 }}>
                    <input type="checkbox" checked={data.deposit} onChange={(e) => update("deposit", e.target.checked)} style={{ marginTop: 4 }} />
                    <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>
                      I understand the deposit is refundable until the first sketch is approved, and I'll receive a confirmation by email.
                    </span>
                  </label>
                  <button className="btn btn-accent btn-lg btn-block" disabled={!data.deposit} onClick={() => setRoute("commission-sent")}
                    style={{ opacity: data.deposit ? 1 : 0.4, cursor: data.deposit ? "pointer" : "not-allowed" }}>
                    Pay ${deposit.toLocaleString()} deposit & reserve <Icon name="arrow-right" size={14} />
                  </button>
                </div>
              )}

              <div className="form-actions">
                <button className="btn btn-ghost" onClick={prev} disabled={step === 0} style={{ opacity: step === 0 ? 0.3 : 1 }}>
                  <Icon name="arrow-left" size={14} /> Back
                </button>
                {step < stepLabels.length - 1 && (
                  <button className="btn btn-primary" onClick={next} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.4 }}>
                    Continue <Icon name="arrow-right" size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ====================== CHECKOUT ======================
function CheckoutPage({ cart, total, setRoute, clearCart }) {
  const [pay, setPay] = React.useState("card");
  const [form, setForm] = React.useState({ email: "", name: "", address: "", city: "", country: "", zip: "", card: "", exp: "", cvc: "" });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const shipping = total > 200 ? 0 : 18;
  const tax = Math.round(total * 0.08);
  const grand = total + shipping + tax;

  const valid = pay !== "card"
    ? form.email && form.name && form.address
    : form.email && form.name && form.address && form.card.length >= 12;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    clearCart();
    setRoute("confirmation");
  };

  if (cart.length === 0) {
    return (
      <div className="page fade-in" style={{ padding: "120px 0", textAlign: "center" }}>
        <div className="container">
          <div className="serif" style={{ fontSize: 56, marginBottom: 12 }}>Your cart is empty.</div>
          <p style={{ color: "var(--ink-soft)", marginBottom: 32 }}>Nothing to check out yet.</p>
          <button className="btn btn-primary btn-lg" onClick={() => setRoute("shop")}>Browse the shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <section className="section-tight" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="eyebrow">Checkout</div>
          <h1 className="serif" style={{ fontSize: 56, lineHeight: 1, margin: "8px 0 32px", letterSpacing: "-0.02em" }}>Almost yours.</h1>
        </div>
      </section>

      <section style={{ paddingBottom: 120 }}>
        <div className="container">
          <form className="checkout-grid" onSubmit={submit}>
            <div>
              <h3 className="serif" style={{ fontSize: 24, marginBottom: 20, fontWeight: 400 }}>Contact</h3>
              <div className="field">
                <label className="field-label">Email</label>
                <input className="input" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
              </div>

              <h3 className="serif" style={{ fontSize: 24, margin: "32px 0 20px", fontWeight: 400 }}>Shipping</h3>
              <div className="field">
                <label className="field-label">Full name</label>
                <input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} required />
              </div>
              <div className="field">
                <label className="field-label">Address</label>
                <input className="input" value={form.address} onChange={(e) => set("address", e.target.value)} required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 16 }}>
                <div className="field"><label className="field-label">City</label><input className="input" value={form.city} onChange={(e) => set("city", e.target.value)} /></div>
                <div className="field"><label className="field-label">Country</label><input className="input" value={form.country} onChange={(e) => set("country", e.target.value)} /></div>
                <div className="field"><label className="field-label">ZIP</label><input className="input" value={form.zip} onChange={(e) => set("zip", e.target.value)} /></div>
              </div>

              <h3 className="serif" style={{ fontSize: 24, margin: "32px 0 20px", fontWeight: 400 }}>Payment</h3>
              <div className="pay-grid">
                <PayCard id="card" sel={pay} onClick={setPay} label="Card" />
                <PayCard id="paypal" sel={pay} onClick={setPay} label="PayPal" />
                <PayCard id="apple" sel={pay} onClick={setPay} label="Apple Pay" />
                <PayCard id="google" sel={pay} onClick={setPay} label="Google Pay" />
              </div>

              {pay === "card" && (
                <div className="fade-in">
                  <div className="field">
                    <label className="field-label">Card number</label>
                    <input className="input" placeholder="1234 1234 1234 1234" value={form.card}
                      onChange={(e) => set("card", e.target.value.replace(/[^\d\s]/g, ""))} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="field"><label className="field-label">Expiry</label><input className="input" placeholder="MM / YY" value={form.exp} onChange={(e) => set("exp", e.target.value)} /></div>
                    <div className="field"><label className="field-label">CVC</label><input className="input" placeholder="123" value={form.cvc} onChange={(e) => set("cvc", e.target.value)} /></div>
                  </div>
                </div>
              )}
              {pay !== "card" && (
                <div className="fade-in" style={{ background: "var(--bg-elev)", padding: 24, borderRadius: 12, fontSize: 14, color: "var(--ink-soft)" }}>
                  You'll be redirected to {pay === "paypal" ? "PayPal" : pay === "apple" ? "Apple Pay" : "Google Pay"} after you place your order.
                </div>
              )}

              <button type="submit" className="btn btn-accent btn-lg btn-block" style={{ marginTop: 32, opacity: valid ? 1 : 0.5 }} disabled={!valid}>
                Pay ${grand.toLocaleString()} · Place order <Icon name="arrow-right" size={14} />
              </button>
            </div>

            <div className="order-summary">
              <div className="eyebrow" style={{ marginBottom: 16 }}>Order summary</div>
              {cart.map((line) => {
                const a = CATALOG.find((x) => x.id === line.id);
                const seedIdx = CATALOG.findIndex((x) => x.id === a.id);
                return (
                  <div key={line.id} style={{ display: "flex", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: "1px solid var(--line-soft)" }}>
                    <div style={{ width: 56, height: 70, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
                      <ArtPlaceholder seed={seedIdx} />
                    </div>
                    <div style={{ flex: 1, fontSize: 13 }}>
                      <div className="serif" style={{ fontSize: 16 }}>{a.title}</div>
                      <div style={{ color: "var(--ink-mute)", fontSize: 11 }}>{a.medium}</div>
                      <div style={{ marginTop: 4, color: "var(--ink-soft)" }}>× {line.qty}</div>
                    </div>
                    <div style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}>${(a.price * line.qty).toLocaleString()}</div>
                  </div>
                );
              })}
              <div className="os-row"><span>Subtotal</span><span>${total.toLocaleString()}</span></div>
              <div className="os-row"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping}`}</span></div>
              <div className="os-row"><span>Tax (est.)</span><span>${tax.toLocaleString()}</span></div>
              <div className="os-row total"><span>Total</span><span>${grand.toLocaleString()}</span></div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function PayCard({ id, sel, onClick, label }) {
  const icons = {
    card: (
      <svg viewBox="0 0 36 22" style={{ height: 22 }}><rect x="0" y="0" width="36" height="22" rx="3" fill="#1d2236" /><rect x="0" y="5" width="36" height="4" fill="#0e1024" /><rect x="4" y="14" width="10" height="2" fill="#e89464" /></svg>
    ),
    paypal: (
      <svg viewBox="0 0 60 22" style={{ height: 22 }}><text x="0" y="17" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="16" fill="#003087">Pay</text><text x="28" y="17" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="16" fill="#009cde">Pal</text></svg>
    ),
    apple: (
      <svg viewBox="0 0 60 22" style={{ height: 20 }}><path d="M10 4c0-1.5 1.2-3 3-3 .2 1.5-.6 3-3 3Zm2 1c-1.5 0-3 1-4 1s-2-1-3-1c-2 0-4 2-4 5 0 3 2 7 4 7 1 0 1.5-1 3-1s2 1 3 1c2 0 4-4 4-7" fill="#1d2236" /><text x="20" y="17" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="14" fill="#1d2236">Pay</text></svg>
    ),
    google: (
      <svg viewBox="0 0 80 22" style={{ height: 20 }}><text x="0" y="17" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="14"><tspan fill="#4285F4">G</tspan><tspan fill="#EA4335">o</tspan><tspan fill="#FBBC04">o</tspan><tspan fill="#4285F4">g</tspan><tspan fill="#34A853">l</tspan><tspan fill="#EA4335">e</tspan></text><text x="44" y="17" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="14" fill="#5f6368">Pay</text></svg>
    ),
  };
  return (
    <button type="button" className={"pay-card " + (sel === id ? "selected" : "")} onClick={() => onClick(id)}>
      {icons[id]}
      <div>{label}</div>
    </button>
  );
}

// ====================== CONFIRMATION ======================
function ConfirmationPage({ setRoute, isCommission }) {
  const orderNum = React.useMemo(() => "ZAS-" + Math.random().toString(36).slice(2, 8).toUpperCase(), []);
  return (
    <div className="page fade-in">
      <div className="container confirm-wrap">
        <div className="confirm-mark">
          <Icon name="check" size={32} />
        </div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>{isCommission ? "Commission reserved" : "Order placed"}</div>
        <h1 className="serif" style={{ fontSize: "clamp(48px,6vw,72px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 16 }}>
          {isCommission ? "Thank you — your spot is held." : "Thank you. Truly."}
        </h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 17, maxWidth: 520, margin: "0 auto 24px", lineHeight: 1.6 }}>
          {isCommission
            ? "Zaarah will be in touch within 48 hours with a first sketch and a refined quote. You'll also get a confirmation email shortly."
            : "A confirmation is on its way to your inbox. Originals ship within 3 business days, prints within 5. Each piece comes with a handwritten note."}
        </p>
        <div className="confirm-num" style={{ marginBottom: 40 }}>Reference · {orderNum}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary btn-lg" onClick={() => setRoute("home")}>Back home</button>
          <button className="btn btn-ghost btn-lg" onClick={() => setRoute("shop")}>Keep browsing</button>
        </div>

        <div style={{ marginTop: 80, maxWidth: 480, margin: "80px auto 0", padding: 32, background: "var(--bg-elev)", borderRadius: "var(--radius-lg)", textAlign: "left" }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>While you wait</div>
          <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 16, lineHeight: 1.6 }}>
            Zaarah posts studio progress on Instagram most mornings — process videos, the cat, occasional sunsets.
          </p>
          <button className="btn btn-ghost"><Icon name="instagram" size={14} /> Follow @zaaos.studio</button>
        </div>
      </div>
    </div>
  );
}

// ====================== CONTACT ======================
function ContactPage({ setRoute }) {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  return (
    <div className="page fade-in">
      <section className="section-tight" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">Contact</div>
              <h1 className="serif" style={{ fontSize: "clamp(48px,7vw,84px)", lineHeight: 1, margin: "8px 0 24px", letterSpacing: "-0.02em" }}>
                Say <em style={{ color: "var(--accent-deep)" }}>hello</em>.
              </h1>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 32 }}>
                For general questions, press, gallery inquiries, or just to send a thought.
                Replies usually within a day or two — the studio gets quiet some afternoons.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Icon name="mail" size={16} /> hello@zaaos.art
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 14 }}>
                  <Icon name="instagram" size={16} /> @zaaos.studio
                </div>
              </div>
              <div style={{ marginTop: 40, padding: 24, background: "var(--bg-elev)", borderRadius: 12 }}>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Looking for a commission?</div>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 16 }}>
                  The commission form moves faster than email — Zaarah responds within 48 hours.
                </p>
                <button className="btn btn-primary" onClick={() => setRoute("commission")}>
                  Start a commission <Icon name="arrow-right" size={14} />
                </button>
              </div>
            </div>
            <div>
              {!sent ? (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  style={{ background: "var(--bg-elev)", padding: 40, borderRadius: "var(--radius-lg)" }}>
                  <div className="field">
                    <label className="field-label">Your name</label>
                    <input className="input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label className="field-label">Email</label>
                    <input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field">
                    <label className="field-label">Message</label>
                    <textarea className="textarea" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block btn-lg">Send <Icon name="arrow-right" size={14} /></button>
                </form>
              ) : (
                <div className="fade-in" style={{ background: "var(--bg-elev)", padding: 60, borderRadius: "var(--radius-lg)", textAlign: "center" }}>
                  <div className="confirm-mark" style={{ width: 60, height: 60, marginBottom: 24 }}>
                    <Icon name="check" size={24} />
                  </div>
                  <div className="serif" style={{ fontSize: 32, fontWeight: 400, marginBottom: 8 }}>Sent.</div>
                  <p style={{ color: "var(--ink-soft)", fontSize: 14 }}>Zaarah will reply soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, ShopPage, CommissionPage, CheckoutPage, ConfirmationPage, ContactPage, ArtCard });
