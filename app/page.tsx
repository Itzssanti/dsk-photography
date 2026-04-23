"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDot.current;
    const ring = cursorRing.current;
    const move = (e: MouseEvent) => {
      if (dot) { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; }
      if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Custom cursor */}
      <div className="custom-cursor" ref={cursorDot} />
      <div className="custom-cursor-ring" ref={cursorRing} />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
           style={{ background: "rgba(250,249,246,0.85)", backdropFilter: "blur(12px)" }}>
        <span className="font-display text-xl tracking-widest" style={{ letterSpacing: "0.25em" }}>DSK</span>
        <div className="flex gap-10">
          <a href="#services" className="nav-link">Services</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end pb-24 px-8 md:px-16 overflow-hidden"
               style={{ background: "var(--cream)" }}>
        {/* Background number */}
        <div className="absolute top-0 right-0 font-display select-none pointer-events-none animate-fade-in"
             style={{ fontSize: "clamp(200px, 30vw, 420px)", lineHeight: 1, color: "var(--border)", fontWeight: 300, letterSpacing: "-0.04em", transform: "translateX(4%)" }}>
          01
        </div>

        {/* Thin gold line top */}
        <div className="absolute top-0 left-0 h-px w-full" style={{ background: "var(--gold)", opacity: 0.5 }} />

        <div className="relative max-w-5xl">
          <p className="section-label mb-8 animate-fade-up">
            Real Estate Photography · San Jose, CA
          </p>

          <h1 className="font-display animate-fade-up delay-1"
              style={{ fontSize: "clamp(52px, 8vw, 120px)", lineHeight: 0.95, fontWeight: 300, letterSpacing: "-0.02em" }}>
            Spaces that<br />
            <em style={{ fontStyle: "italic" }}>compel</em> a<br />
            second look<span className="gold-dot">.</span>
          </h1>

          <p className="animate-fade-up delay-2 mt-8"
             style={{ fontSize: "15px", color: "var(--stone)", maxWidth: "420px", lineHeight: 1.7 }}>
            Cinematic real estate photography and video for agents who understand that first impressions are made before the door opens.
          </p>

          <div className="flex items-center gap-8 mt-12 animate-fade-up delay-3">
            <a href="#contact"
               className="inline-block px-8 py-3.5 text-xs tracking-widest uppercase"
               style={{ background: "var(--ink)", color: "var(--cream)", letterSpacing: "0.18em", fontWeight: 400, textDecoration: "none", transition: "opacity 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
               onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
              Book a Shoot
            </a>
            <a href="#portfolio" className="nav-link flex items-center gap-2">
              View Portfolio <span style={{ fontSize: "16px" }}>→</span>
            </a>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-6 animate-fade-in">
          <span className="section-label">Sony FX30</span>
          <div className="h-px w-12" style={{ background: "var(--border)" }} />
          <span className="section-label">Bay Area</span>
        </div>
      </section>

      {/* ─── SERVICES / PRICING ─── */}
      <section id="services" className="px-8 md:px-16 py-28"
               style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="section-label mb-4">Services & Pricing</p>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                What&rsquo;s included<span className="gold-dot">.</span>
              </h2>
            </div>
            <p style={{ color: "var(--stone)", fontSize: "14px", maxWidth: "300px", lineHeight: 1.7 }}>
              Every shoot is edited and delivered within 24 hours. No upsells, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ background: "var(--border)" }}>
            {/* Intro */}
            <div className="reveal p-10 flex flex-col" style={{ background: "var(--cream)" }}>
              <p className="section-label mb-6">Intro</p>
              <p className="font-display mb-2" style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1 }}>
                $150
              </p>
              <p style={{ color: "var(--stone)", fontSize: "12px", marginBottom: "auto" }}>per shoot</p>
              <div className="h-px my-8" style={{ background: "var(--border)" }} />
              <ul style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 2 }}>
                <li>Up to 15 photos</li>
                <li>Full edit &amp; color grade</li>
                <li>MLS-ready delivery</li>
                <li>24hr turnaround</li>
              </ul>
            </div>

            {/* Standard — hero card */}
            <div className="reveal p-10 flex flex-col" style={{ background: "var(--ink)" }}>
              <div className="flex items-center justify-between mb-6">
                <p className="section-label" style={{ color: "var(--stone)" }}>Standard</p>
                <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 500 }}>Most Popular</span>
              </div>
              <p className="font-display mb-2" style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1, color: "var(--cream)" }}>
                $250
              </p>
              <p style={{ color: "var(--stone)", fontSize: "12px", marginBottom: "auto" }}>per shoot</p>
              <div className="h-px my-8" style={{ background: "#222" }} />
              <ul style={{ fontSize: "13px", color: "#7a7672", lineHeight: 2 }}>
                <li style={{ color: "var(--cream)" }}>25–40 photos</li>
                <li style={{ color: "var(--cream)" }}>Full edit &amp; color grade</li>
                <li style={{ color: "var(--cream)" }}>Twilight shots available</li>
                <li style={{ color: "var(--cream)" }}>MLS + social ready</li>
                <li>24hr turnaround</li>
              </ul>
            </div>

            {/* Video */}
            <div className="reveal p-10 flex flex-col" style={{ background: "var(--cream)" }}>
              <p className="section-label mb-6">Video Add-on</p>
              <p className="font-display mb-2" style={{ fontSize: "48px", fontWeight: 300, lineHeight: 1 }}>
                +$150
              </p>
              <p style={{ color: "var(--stone)", fontSize: "12px", marginBottom: "auto" }}>added to any package</p>
              <div className="h-px my-8" style={{ background: "var(--border)" }} />
              <ul style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 2 }}>
                <li>60–90s cinematic reel</li>
                <li>Stabilized walkthrough</li>
                <li>Music + color grade</li>
                <li>Social-optimized cut</li>
              </ul>
            </div>
          </div>

          <div className="reveal mt-8 flex items-center gap-3" style={{ color: "var(--stone)", fontSize: "13px" }}>
            <span style={{ color: "var(--gold)" }}>✦</span>
            Custom packages for agents with multiple monthly listings. <a href="#contact" style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>Let&rsquo;s talk.</a>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="px-8 md:px-16 py-28"
               style={{ background: "var(--ink)", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <p className="section-label mb-4" style={{ color: "#4a4744" }}>Portfolio</p>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--cream)" }}>
              The work<span style={{ color: "var(--gold)" }}>.</span>
            </h2>
          </div>

          {/* Placeholder grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {[
              { label: "Living Room — Willow Glen", aspect: "aspect-[4/3]" },
              { label: "Kitchen — Almaden Valley", aspect: "aspect-square" },
              { label: "Exterior — Los Gatos", aspect: "aspect-[4/3]" },
              { label: "Master Suite — Blossom Hill", aspect: "aspect-square" },
              { label: "Aerial — Campbell", aspect: "aspect-[4/3]" },
              { label: "Twilight — Saratoga", aspect: "aspect-square" },
            ].map((item, i) => (
              <div key={i} className={`reveal relative ${item.aspect} overflow-hidden group`}
                   style={{ background: "#181614", transitionDelay: `${i * 0.06}s` }}>
                {/* Placeholder shimmer */}
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}>
                  <p style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{item.label}</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{ width: "1px", height: "40px", background: "#2a2825" }} />
                </div>
                {/* Grid number */}
                <span className="absolute top-3 left-3 font-display"
                      style={{ fontSize: "11px", color: "#2e2b28", letterSpacing: "0.1em" }}>
                  0{i + 1}
                </span>
              </div>
            ))}
          </div>

          <p className="reveal mt-6 text-center" style={{ fontSize: "12px", color: "#3a3733", letterSpacing: "0.1em" }}>
            Portfolio photos coming soon — shoot samples available on request.
          </p>
        </div>
      </section>

      {/* ─── WHY DSK ─── */}
      <section className="px-8 md:px-16 py-28" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="reveal">
            <p className="section-label mb-4">Why DSK</p>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Shot like a film.<br />Delivered like a<br />listing<span className="gold-dot">.</span>
            </h2>
          </div>
          <div className="reveal grid grid-cols-1 gap-8">
            {[
              { n: "01", title: "Sony FX30 Cinema Camera", body: "Not a DSLR, not a drone app. A proper cinema sensor with Nikon glass — the kind of look that makes scrolling stop." },
              { n: "02", title: "24-Hour Delivery", body: "Photos in your inbox before the listing goes live. Every time, no exceptions." },
              { n: "03", title: "Bay Area Native", body: "San Jose base, full coverage from Santa Clara to Los Gatos. No travel fees within 20 miles." },
            ].map((item) => (
              <div key={item.n} className="flex gap-6">
                <span className="font-display" style={{ fontSize: "13px", color: "var(--stone)", paddingTop: "2px", minWidth: "24px" }}>{item.n}</span>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 500, marginBottom: "6px" }}>{item.title}</p>
                  <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="px-8 md:px-16 py-28"
               style={{ background: "var(--ink)", borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-5xl mx-auto">
          <div className="reveal mb-16">
            <p className="section-label mb-4" style={{ color: "#4a4744" }}>Book a Shoot</p>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 0.95, color: "var(--cream)" }}>
              Let&rsquo;s make<br />your listing<br /><em>unmissable</em><span style={{ color: "var(--gold)" }}>.</span>
            </h2>
          </div>

          <form className="reveal grid md:grid-cols-2 gap-6"
                onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll be in touch within a few hours."); }}>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4744", display: "block", marginBottom: "8px" }}>Name</label>
              <input required type="text" placeholder="Your name"
                     className="w-full bg-transparent outline-none"
                     style={{ borderBottom: "1px solid #2a2825", paddingBottom: "10px", fontSize: "14px", color: "var(--cream)", caretColor: "var(--gold)" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4744", display: "block", marginBottom: "8px" }}>Email</label>
              <input required type="email" placeholder="you@brokerage.com"
                     className="w-full bg-transparent outline-none"
                     style={{ borderBottom: "1px solid #2a2825", paddingBottom: "10px", fontSize: "14px", color: "var(--cream)", caretColor: "var(--gold)" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4744", display: "block", marginBottom: "8px" }}>Property Address</label>
              <input type="text" placeholder="123 Main St, San Jose"
                     className="w-full bg-transparent outline-none"
                     style={{ borderBottom: "1px solid #2a2825", paddingBottom: "10px", fontSize: "14px", color: "var(--cream)", caretColor: "var(--gold)" }} />
            </div>
            <div>
              <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4744", display: "block", marginBottom: "8px" }}>Package</label>
              <select className="w-full bg-transparent outline-none appearance-none"
                      style={{ borderBottom: "1px solid #2a2825", paddingBottom: "10px", fontSize: "14px", color: "#7a7672", caretColor: "var(--gold)" }}>
                <option value="" style={{ background: "#0E0E0E" }}>Select a package</option>
                <option value="intro" style={{ background: "#0E0E0E" }}>Intro — $150</option>
                <option value="standard" style={{ background: "#0E0E0E" }}>Standard — $250</option>
                <option value="standard-video" style={{ background: "#0E0E0E" }}>Standard + Video — $400</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#4a4744", display: "block", marginBottom: "8px" }}>Message (optional)</label>
              <textarea rows={3} placeholder="Listing details, preferred date, anything else..."
                        className="w-full bg-transparent outline-none resize-none"
                        style={{ borderBottom: "1px solid #2a2825", paddingBottom: "10px", fontSize: "14px", color: "var(--cream)", caretColor: "var(--gold)" }} />
            </div>
            <div className="md:col-span-2 flex items-center gap-8 pt-4">
              <button type="submit"
                      className="px-10 py-3.5 text-xs tracking-widest uppercase"
                      style={{ background: "var(--cream)", color: "var(--ink)", letterSpacing: "0.18em", fontWeight: 500, border: "none", transition: "opacity 0.2s" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                Send Request
              </button>
              <p style={{ fontSize: "12px", color: "#4a4744" }}>Or email directly: <a href="mailto:hello@dskphoto.com" style={{ color: "var(--stone)", textDecoration: "none" }}>hello@dskphoto.com</a></p>
            </div>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="px-8 md:px-16 py-10 flex items-center justify-between flex-wrap gap-4"
              style={{ borderTop: "1px solid var(--border)" }}>
        <span className="font-display" style={{ fontSize: "18px", letterSpacing: "0.22em" }}>DSK</span>
        <p style={{ fontSize: "11px", color: "var(--stone)" }}>© {new Date().getFullYear()} DSK Real Estate Photography · San Jose, CA</p>
        <div className="flex gap-8">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="nav-link">Instagram</a>
          <a href="mailto:hello@dskphoto.com" className="nav-link">Email</a>
        </div>
      </footer>
    </>
  );
}
