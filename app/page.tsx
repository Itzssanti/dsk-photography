"use client";
import { useEffect, useRef } from "react";

const CALENDLY_STANDARD = "https://calendly.com/theepageautomation/new-meeting";
const CALENDLY_ESSENTIAL = "https://calendly.com/theepageautomation/essential";

// Placeholder hero image (real estate, free from Unsplash via direct URL)
const HERO_IMG = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1800&q=80";

const reviews = [
  { quote: "The photos sold the house in nine days. Our seller was speechless. DSK is the only studio we call.", name: "Elena Park", brokerage: "Coldwell Banker — Los Gatos" },
  { quote: "Shows up, works quietly, delivers the next morning. No drama, no re-shoots. I book before I list.", name: "Marcus Wu", brokerage: "Compass — San Jose" },
  { quote: "Twilight shoots that actually look like twilight, not a video game. Buyers notice.", name: "Priya Natarajan", brokerage: "Intero — Cupertino" },
  { quote: "The first set of images made our client cry. In a good way.", name: "Jordan Ellis", brokerage: "Sereno — Saratoga" },
];

export default function Home() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX+"px"; dot.current.style.top = e.clientY+"px"; }
      if (ring.current) { ring.current.style.left = e.clientX+"px"; ring.current.style.top = e.clientY+"px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="cur-dot" ref={dot} />
      <div className="cur-ring" ref={ring} />

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-5"
           style={{ background: "rgba(245,243,238,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <span className="font-display font-semibold tracking-widest text-lg" style={{ letterSpacing: "0.22em" }}>D S K</span>
        <div className="hidden md:flex items-center gap-10">
          <a href="#work" className="nav-link">Work</a>
          <a href="#packages" className="nav-link">Packages</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#studio" className="nav-link">About</a>
        </div>
        <a href={CALENDLY_ESSENTIAL} target="_blank" rel="noreferrer"
           className="btn-outline text-xs" style={{ padding:"10px 22px" }}>
          Book a shoot
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 ai" style={{
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />

        {/* Top right label */}
        <div className="absolute top-24 right-8 md:right-12 text-right ai" style={{ animationDelay:"0.8s" }}>
          <p className="label label-white">Saratoga Residence</p>
          <p className="label label-white" style={{ marginTop:"2px" }}>Twilight · 4,200 sqft</p>
        </div>

        <div className="relative px-8 md:px-12 pb-16 md:pb-20">
          <p className="label label-white mb-5 au">South Bay · Est. 2024</p>
          <h1 className="font-display text-white au d1"
              style={{ fontSize:"clamp(52px,9vw,130px)", lineHeight:0.93, fontWeight:500, letterSpacing:"-0.02em" }}>
            Listings that<br />move<span style={{ color:"#fff" }}>.</span>
          </h1>
          <p className="text-white au d2 mt-5" style={{ fontSize:"16px", opacity:0.75, maxWidth:"460px", lineHeight:1.65 }}>
            Architectural photography for South Bay real estate.<br />
            Clean frames, honest light, 24-hour delivery.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 au d3">
            <a href={CALENDLY_STANDARD} target="_blank" rel="noreferrer" className="btn-dark" style={{ background:"#fff", color:"#0F0F0F" }}>
              Book a shoot
            </a>
            <a href="#work" className="btn-outline-white">View work →</a>
          </div>
        </div>
      </section>

      {/* ── WORK / PORTFOLIO ── */}
      <section id="work" className="px-8 md:px-12 py-24" style={{ background:"var(--cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="reveal mb-12">
            <p className="label mb-3">01 — Work</p>
            <h2 className="font-display" style={{ fontSize:"clamp(40px,6vw,80px)", fontWeight:500, lineHeight:1, letterSpacing:"-0.02em" }}>
              Recent shoots across<br />the South Bay.
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {[
              { loc:"SARATOGA", title:"Hillside modern on Saratoga Ave", bed:4, bath:3, sqft:"2,480", num:"001", tall:true },
              { loc:"LOS GATOS", title:"Glass box above the ridge", bed:5, bath:4.5, sqft:"3,920", num:"002", tall:false },
              { loc:"CAMPBELL", title:"Mid-century on Winchester", bed:3, bath:2, sqft:"1,840", num:"003", tall:false },
              { loc:"WILLOW GLEN", title:"Craftsman with pool house", bed:4, bath:3.5, sqft:"3,100", num:"004", tall:false },
              { loc:"ALMADEN", title:"New build with valley views", bed:5, bath:4, sqft:"4,200", num:"005", tall:true },
              { loc:"CUPERTINO", title:"Corner lot, all light", bed:3, bath:2, sqft:"1,680", num:"006", tall:false },
            ].map((p, i) => (
              <div key={i} className="reveal group relative overflow-hidden bg-neutral-200"
                   style={{ aspectRatio: i===0||i===4 ? "3/4" : "4/3", transitionDelay:`${i*0.07}s` }}>
                {/* Placeholder — gray with number */}
                <div className="absolute inset-0 flex items-center justify-center"
                     style={{ background:`hsl(${30+i*8},8%,${82-i*3}%)` }}>
                  <span className="font-display" style={{ fontSize:"clamp(48px,8vw,100px)", color:"rgba(0,0,0,0.06)", fontWeight:500 }}>{p.num}</span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
                     style={{ background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}>
                  <p className="label" style={{ color:"rgba(255,255,255,0.6)", marginBottom:"4px" }}>{p.loc}</p>
                  <p className="font-display text-white" style={{ fontSize:"15px", fontWeight:400 }}>{p.title}</p>
                  <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.5)", marginTop:"4px" }}>{p.bed} bed · {p.bath} ba · {p.sqft} sqft</p>
                </div>
                <span className="absolute top-3 left-3 sec-num">{p.num}</span>
              </div>
            ))}
          </div>
          <p className="reveal mt-4 text-center" style={{ fontSize:"12px", color:"var(--mid)" }}>
            Portfolio photos being added — samples available on request · hello@dskphoto.co
          </p>
        </div>
      </section>

      {/* ── STUDIO ── */}
      <section id="studio" style={{ background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-24 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: placeholder photo */}
          <div className="reveal" style={{ aspectRatio:"4/5", background:"#D8D4CC", position:"relative", overflow:"hidden" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display" style={{ fontSize:"80px", color:"rgba(0,0,0,0.07)", fontWeight:500 }}>DSK</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.35),transparent)" }}>
              <p className="label" style={{ color:"rgba(255,255,255,0.7)" }}>Sony FX30 · Nikon glass</p>
            </div>
          </div>
          {/* Right: copy */}
          <div className="reveal d1s">
            <p className="label mb-4">02 — Studio</p>
            <h2 className="font-display mb-6" style={{ fontSize:"clamp(36px,4.5vw,64px)", fontWeight:500, lineHeight:1.05, letterSpacing:"-0.02em" }}>
              One photographer.<br />Every shoot.
            </h2>
            <p style={{ color:"var(--mid)", fontSize:"15px", lineHeight:1.75, marginBottom:"16px" }}>
              DSK is an independent, single-operator studio. No teams, no subcontractors.
            </p>
            <p style={{ color:"var(--mid)", fontSize:"15px", lineHeight:1.75, marginBottom:"32px" }}>
              Every listing is handled personally — from the walkthrough to final delivery.
            </p>
            <div className="h-px mb-8" style={{ background:"var(--border)" }} />
            <div className="grid grid-cols-3 gap-6">
              {[["1:1","Client focus"],["24h","Avg turnaround"],["12d","Median DOM"]].map(([n,l]) => (
                <div key={n}>
                  <p className="font-display" style={{ fontSize:"36px", fontWeight:500, lineHeight:1 }}>{n}</p>
                  <p className="label mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" style={{ background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-24">
          <div className="reveal mb-12">
            <p className="label mb-3">03 — Packages</p>
            <h2 className="font-display" style={{ fontSize:"clamp(40px,6vw,80px)", fontWeight:500, lineHeight:1, letterSpacing:"-0.02em" }}>
              Packages.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Standard */}
            <div className="reveal flex flex-col p-10" style={{ background:"#EDEAE3" }}>
              <div className="flex items-center justify-between mb-8">
                <p className="label">Photos</p>
              </div>
              <p className="label mb-1" style={{ color:"var(--mid)" }}>Starting at</p>
              <p className="font-display" style={{ fontSize:"72px", fontWeight:500, lineHeight:1, letterSpacing:"-0.03em" }}>
                <sup style={{ fontSize:"32px", verticalAlign:"super" }}>$</sup>150
              </p>
              <p className="mt-3 mb-6" style={{ fontSize:"14px", color:"var(--mid)", lineHeight:1.65 }}>
                Clean, honest listing photography. Most single-family homes.
              </p>
              <div className="h-px mb-6" style={{ background:"var(--border)" }} />
              <ul style={{ fontSize:"13px", color:"var(--mid)", lineHeight:2.2, marginBottom:"auto" }}>
                {["Up to 25 edited images","Interior + exterior","24-hour turnaround","MLS-sized + full-res"].map(f => (
                  <li key={f} style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <span style={{ color:"var(--ink)", fontSize:"16px" }}>—</span>{f}
                  </li>
                ))}
              </ul>
              <a href={CALENDLY_STANDARD} target="_blank" rel="noreferrer"
                 className="btn-outline mt-10 text-center" style={{ display:"block" }}>
                Book Photos
              </a>
            </div>

            {/* Essential */}
            <div className="reveal d1s flex flex-col p-10" style={{ background:"var(--ink)" }}>
              <div className="flex items-center justify-between mb-8">
                <p className="label label-white">Photos + Video</p>
                <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--blue)", fontWeight:500 }}>Most Booked</span>
              </div>
              <p className="label mb-1" style={{ color:"rgba(255,255,255,0.35)" }}>Starting at</p>
              <p className="font-display text-white" style={{ fontSize:"72px", fontWeight:500, lineHeight:1, letterSpacing:"-0.03em" }}>
                <sup style={{ fontSize:"32px", verticalAlign:"super" }}>$</sup>400
              </p>
              <p className="mt-3 mb-6" style={{ fontSize:"14px", color:"rgba(255,255,255,0.5)", lineHeight:1.65 }}>
                Stills plus a cinematic walkthrough. Listings that need motion.
              </p>
              <div className="h-px mb-6" style={{ background:"rgba(255,255,255,0.08)" }} />
              <ul style={{ fontSize:"13px", lineHeight:2.2, marginBottom:"auto" }}>
                {[
                  ["Up to 40 edited images", true],
                  ["60–90s cinematic walkthrough", true],
                  ["Interior + exterior", true],
                  ["Vertical cut for social", true],
                  ["24-hour turnaround", false],
                ].map(([f, hi]) => (
                  <li key={f as string} style={{ display:"flex", alignItems:"center", gap:"12px", color: hi ? "#fff" : "rgba(255,255,255,0.35)" }}>
                    <span style={{ color:"var(--blue)", fontSize:"16px" }}>—</span>{f as string}
                  </li>
                ))}
              </ul>
              <a href={CALENDLY_ESSENTIAL} target="_blank" rel="noreferrer"
                 className="btn-outline-white mt-10 text-center" style={{ display:"block" }}>
                Book Photos + Video
              </a>
            </div>
          </div>

          <p className="reveal mt-6" style={{ fontSize:"13px", color:"var(--mid)" }}>
            Multiple listings/month? <a href={`mailto:hello@dskphoto.co`} style={{ color:"var(--ink)", textDecoration:"underline", textUnderlineOffset:"3px" }}>Email for a retainer rate.</a>
          </p>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" style={{ background:"var(--dark)", borderTop:"1px solid #1e1e28" }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-24">
          <div className="reveal flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="label label-white mb-3">04 — Reviews</p>
              <h2 className="font-display text-white" style={{ fontSize:"clamp(36px,5vw,72px)", fontWeight:500, lineHeight:1, letterSpacing:"-0.02em" }}>
                From agents<br />who re-book.
              </h2>
            </div>
            <p className="label" style={{ color:"rgba(255,255,255,0.25)" }}>4.9 avg · growing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            {reviews.map((r, i) => (
              <div key={i} className="reveal py-8 pr-8" style={{ borderTop:"1px solid rgba(255,255,255,0.07)", transitionDelay:`${i*0.08}s` }}>
                <span className="font-display" style={{ fontSize:"32px", color:"var(--blue)", lineHeight:1 }}>&ldquo;</span>
                <p className="font-display text-white mt-2" style={{ fontSize:"clamp(16px,2vw,22px)", lineHeight:1.45, fontWeight:400 }}>
                  {r.quote}
                </p>
                <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)", marginTop:"16px", letterSpacing:"0.05em" }}>
                  {r.name} — {r.brokerage}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:"var(--cream)", borderTop:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-28 text-center">
          <p className="label reveal mb-6">Ready?</p>
          <h2 className="font-display reveal d1s" style={{ fontSize:"clamp(52px,9vw,120px)", fontWeight:500, lineHeight:0.92, letterSpacing:"-0.03em" }}>
            Book the shoot.
          </h2>
          <div className="reveal d2s mt-10">
            <a href={CALENDLY_ESSENTIAL} target="_blank" rel="noreferrer" className="btn-dark" style={{ fontSize:"14px", padding:"16px 40px" }}>
              Check availability
            </a>
            <p className="mt-4" style={{ fontSize:"12px", color:"var(--mid)", letterSpacing:"0.05em" }}>
              Typical response within 2 hours · Mon–Sat
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"var(--dark)", borderTop:"1px solid #1e1e28" }}>
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <p className="font-display text-white text-2xl mb-3" style={{ letterSpacing:"0.2em" }}>DSK</p>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", lineHeight:1.7 }}>
              Real estate photography for the South Bay.<br />Independent studio, based in San Jose.
            </p>
          </div>
          <div>
            <p className="label label-white mb-4">Site</p>
            {[["Work","#work"],["Packages","#packages"],["Reviews","#reviews"],["About","#studio"]].map(([l,h]) => (
              <a key={l} href={h} className="block nav-link mb-3" style={{ color:"rgba(255,255,255,0.5)" }}>{l}</a>
            ))}
          </div>
          <div>
            <p className="label label-white mb-4">Contact</p>
            <a href="mailto:hello@dskphoto.co" className="block nav-link mb-3" style={{ color:"rgba(255,255,255,0.5)" }}>hello@dskphoto.co</a>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.35)" }}>San Jose, CA</p>
          </div>
          <div>
            <p className="label label-white mb-4">Elsewhere</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="block nav-link mb-3" style={{ color:"rgba(255,255,255,0.5)" }}>Instagram ↗</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-8 md:px-12 pb-8 flex items-center justify-between flex-wrap gap-4"
             style={{ borderTop:"1px solid rgba(255,255,255,0.05)", paddingTop:"24px" }}>
          <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.1em", textTransform:"uppercase" }}>© 2026 DSK Photography</p>
          <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.2)", letterSpacing:"0.08em", textTransform:"uppercase" }}>San Jose · 37.3382° N, 121.8863° W</p>
        </div>
      </footer>
    </>
  );
}
