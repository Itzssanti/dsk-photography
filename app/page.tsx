"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const CAL_STD = "https://calendly.com/theepageautomation/new-meeting";
const CAL_ESS = "https://calendly.com/theepageautomation/essential";
const HERO = "https://images.unsplash.com/photo-1756435292384-1bf32eff7baf?w=1920&q=85&auto=format&fit=crop";

const NAV_LINKS = [["Work","#work"],["Packages","#packages"],["Reviews","#reviews"],["About","#studio"]];

const PORTFOLIO = [
  { loc:"SARATOGA",      title:"Hillside modern on Saratoga Ave",  bed:4, bath:3,   sqft:"2,480", n:"001", size:"lg", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80" },
  { loc:"LOS GATOS",    title:"Glass box above the ridge",         bed:5, bath:4.5, sqft:"3,920", n:"002", size:"sm", img:"https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80" },
  { loc:"CAMPBELL",     title:"Mid-century on Winchester",         bed:3, bath:2,   sqft:"1,640", n:"003", size:"sm", img:"https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=1200&q=80" },
  { loc:"SAN JOSE",     title:"Craftsman on Naglee",               bed:4, bath:3,   sqft:"2,100", n:"004", size:"lg", img:"https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80" },
  { loc:"CUPERTINO",    title:"Eichler restoration",               bed:3, bath:2,   sqft:"1,780", n:"005", size:"sm", img:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80" },
  { loc:"MOUNTAIN VIEW",title:"Downtown penthouse",                bed:2, bath:2,   sqft:"1,320", n:"006", size:"sm", img:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" },
  { loc:"WILLOW GLEN",  title:"Ranch on Mary Ave",                 bed:3, bath:2,   sqft:"1,940", n:"007", size:"lg", img:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80" },
  { loc:"SANTA CLARA",  title:"Townhome on The Alameda",           bed:3, bath:2.5, sqft:"1,580", n:"008", size:"sm", img:"https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80" },
];

const REVIEWS = [
  { q:"The photos sold the house in nine days. Our seller was speechless. DSK is the only studio we call.", name:"Elena Park", co:"Coldwell Banker — Los Gatos" },
  { q:"Shows up, works quietly, delivers the next morning. No drama, no re-shoots. I book before I list.", name:"Marcus Wu", co:"Compass — San Jose" },
  { q:"Twilight shoots that actually look like twilight, not a video game. Buyers notice.", name:"Priya Natarajan", co:"Intero — Cupertino" },
  { q:"The first set of images made our client cry. In a good way.", name:"Jordan Ellis", co:"Sereno — Saratoga" },
];

const ADDONS = ["Virtual staging","Twilight exterior","Drone aerial","2D floorplan","3D Matterport tour","Vertical social reel","Detail shots","Rush delivery"];

export default function Home() {
  const curDot = useRef<HTMLDivElement>(null);
  const curRing = useRef<HTMLDivElement>(null);
  const [pkg, setPkg] = useState<"photos"|"video">("video");
  const [addons, setAddons] = useState<Set<string>>(new Set());

  // Carousel state
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (curDot.current) { curDot.current.style.left=e.clientX+"px"; curDot.current.style.top=e.clientY+"px"; }
      if (curRing.current) { curRing.current.style.left=e.clientX+"px"; curRing.current.style.top=e.clientY+"px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }), { threshold: 0.08 });
    document.querySelectorAll(".reveal, .rimg").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Carousel scroll tracking
  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => { el.removeEventListener("scroll", updateEdges); window.removeEventListener("resize", updateEdges); };
  }, [updateEdges]);

  // Carousel drag-to-scroll
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let down = false, startX = 0, startScroll = 0;
    const onDown = (e: MouseEvent) => { down=true; startX=e.pageX; startScroll=el.scrollLeft; el.style.cursor="grabbing"; };
    const onMove = (e: MouseEvent) => { if (!down) return; el.scrollLeft = startScroll-(e.pageX-startX); };
    const onUp = () => { down=false; el.style.cursor="grab"; };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { el.removeEventListener("mousedown", onDown); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const scrollByPage = (dir: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const toggleAddon = (a: string) => setAddons(prev => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });

  const C = {
    bg: "#FAFAF8", card: "#F0EDE6", dark: "#1A1A1A", ink: "#111111",
    mid: "#888480", border: "#E0DDD7", accent: "#C0784A",
  };

  const label = (txt: string, light=false) => (
    <p style={{ fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color: light?"rgba(255,255,255,0.45)":C.mid, fontWeight:400 }}>{txt}</p>
  );

  return (
    <div style={{ background:C.bg, color:C.ink, fontFamily:"'DM Sans', system-ui, sans-serif", fontWeight:300 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        *,a,button,select{cursor:none!important;}
        .disp{font-family:'Cormorant Garamond',Georgia,serif;}
        @keyframes up{from{opacity:0;transform:translate3d(0,32px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
        @keyframes fadein{from{opacity:0}to{opacity:1}}
        .au{animation:up 0.9s cubic-bezier(0.22,1,0.36,1) both;will-change:transform,opacity;}
        .ai{animation:fadein 1.1s cubic-bezier(0.22,1,0.36,1) both;will-change:opacity;}
        .d1{animation-delay:.1s}.d2{animation-delay:.2s}.d3{animation-delay:.32s}.d4{animation-delay:.44s}
        .reveal{opacity:0;transform:translate3d(0,20px,0);transition:opacity 0.7s cubic-bezier(0.22,1,0.36,1),transform 0.7s cubic-bezier(0.22,1,0.36,1);will-change:transform,opacity;}
        .reveal.on{opacity:1;transform:translate3d(0,0,0);}
        .rimg img{transition:transform 0.9s cubic-bezier(0.22,1,0.36,1),opacity 0.9s cubic-bezier(0.22,1,0.36,1);transform:scale(1.06);opacity:0;will-change:transform,opacity;}
        .rimg.on img{transform:scale(1);opacity:1;}
        .nav-a{font-size:13px;color:#111;text-decoration:none;opacity:0.55;transition:opacity 0.22s cubic-bezier(0.22,1,0.36,1);font-weight:400;}
        .nav-a:hover{opacity:1;}
        .img-hover{transition:transform 0.7s cubic-bezier(0.22,1,0.36,1);will-change:transform;}
        .img-wrap:hover .img-hover{transform:scale(1.04);}
        .pkg-btn{padding:11px 0;font-size:13px;font-weight:400;border:1px solid #E0DDD7;background:#fff;color:#111;flex:1;transition:all 0.18s cubic-bezier(0.22,1,0.36,1);}
        .pkg-btn.active{background:#111;color:#fff;border-color:#111;}
        .addon-btn{padding:14px 12px;font-size:12px;font-weight:400;border:1px solid #E0DDD7;background:#fff;color:#111;text-align:left;transition:all 0.18s cubic-bezier(0.22,1,0.36,1);line-height:1.3;}
        .addon-btn.sel{background:#111;color:#fff;border-color:#111;}
        .addon-btn small{display:block;opacity:0.45;font-size:10px;margin-top:2px;}
        select{appearance:none;-webkit-appearance:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E") no-repeat right 12px center;background-color:#fff;padding-right:32px!important;}
        #work ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* CURSOR */}
      <div ref={curDot} style={{ position:"fixed",top:0,left:0,width:6,height:6,background:C.ink,borderRadius:"50%",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)" }} />
      <div ref={curRing} style={{ position:"fixed",top:0,left:0,width:24,height:24,border:`1px solid rgba(17,17,17,0.25)`,borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"left 0.3s cubic-bezier(0.16,1,0.3,1),top 0.3s cubic-bezier(0.16,1,0.3,1)" }} />

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:64,background:"rgba(250,250,248,0.92)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${C.border}` }}>
        <span className="disp" style={{ fontSize:18,fontWeight:500,letterSpacing:"0.18em" }}>D S K</span>
        <div style={{ display:"flex",gap:32 }}>
          {NAV_LINKS.map(([l,h]) => <a key={l} href={h} className="nav-a">{l}</a>)}
        </div>
        <a href={CAL_ESS} target="_blank" rel="noreferrer"
           style={{ fontSize:12,fontWeight:400,color:C.ink,textDecoration:"none",border:`1px solid ${C.ink}`,padding:"8px 18px",transition:"opacity 0.2s" }}
           onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          Book a shoot
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position:"relative",height:"100vh",minHeight:640,display:"flex",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden" }}>
        <div className="ai" style={{ position:"absolute",inset:0,backgroundImage:`url(${HERO})`,backgroundSize:"cover",backgroundPosition:"center 40%" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.05) 50%,transparent 100%)" }} />
        {/* Top right counter */}
        <div className="au d4" style={{ position:"absolute",top:80,right:40,textAlign:"right" }}>
          <p style={{ fontSize:10,letterSpacing:"0.18em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase" }}>01 / 006</p>
          <p style={{ fontSize:10,letterSpacing:"0.15em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",marginTop:2 }}>Saratoga Residence</p>
          <p style={{ fontSize:10,letterSpacing:"0.15em",color:"rgba(255,255,255,0.4)",textTransform:"uppercase",marginTop:2 }}>Twilight · 5,200 sqm</p>
        </div>
        <div style={{ position:"relative",padding:"0 40px 56px" }}>
          <p className="au" style={{ fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",marginBottom:16 }}>South Bay · Est. 2024</p>
          <h1 className="disp au d1" style={{ fontSize:"clamp(60px,9.5vw,132px)",lineHeight:0.9,fontWeight:500,color:"#fff",letterSpacing:"-0.02em",maxWidth:900 }}>
            Listings that move.
          </h1>
          <p className="au d2" style={{ fontSize:15,color:"rgba(255,255,255,0.65)",marginTop:20,lineHeight:1.7 }}>
            Architectural photography for South Bay real estate.<br/>Clean frames, honest light, same-week delivery.
          </p>
          <div className="au d3" style={{ display:"flex",gap:12,marginTop:28,flexWrap:"wrap" }}>
            <a href={CAL_STD} target="_blank" rel="noreferrer"
               style={{ display:"inline-block",background:"#fff",color:C.ink,padding:"13px 28px",fontSize:13,fontWeight:400,textDecoration:"none",transition:"opacity 0.2s" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Book a shoot
            </a>
            <a href="#work"
               style={{ display:"inline-block",border:"1px solid rgba(255,255,255,0.5)",color:"#fff",padding:"12px 28px",fontSize:13,fontWeight:400,textDecoration:"none",transition:"opacity 0.2s" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              View work →
            </a>
          </div>
        </div>
      </section>

      {/* WORK — horizontal carousel */}
      <section id="work" style={{ padding:"88px 0",background:C.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 40px" }}>
          <div className="reveal" style={{ marginBottom:40,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16 }}>
            <div>
              {label("01 — Work")}
              <h2 className="disp" style={{ fontSize:"clamp(44px,5.5vw,80px)",fontWeight:500,lineHeight:1,letterSpacing:"-0.02em",marginTop:12 }}>
                Recent shoots across<br/>the South Bay.
              </h2>
            </div>
            <p style={{ fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.mid }}>{PORTFOLIO.length} of 24 properties · 2025</p>
          </div>
        </div>

        {/* Full-bleed scroller */}
        <div style={{ position:"relative" }}>
          {/* Arrow left */}
          <div style={{ position:"absolute",top:0,bottom:56,left:0,width:40,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,pointerEvents:"none" }}>
            <button onClick={()=>scrollByPage(-1)} disabled={!canLeft}
              style={{ pointerEvents:"auto",width:44,height:44,background:canLeft?C.ink:"transparent",color:canLeft?"#fff":C.border,border:`1px solid ${canLeft?C.ink:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)",cursor:canLeft?"pointer":"default" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
            </button>
          </div>
          {/* Arrow right */}
          <div style={{ position:"absolute",top:0,bottom:56,right:0,width:40,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,pointerEvents:"none" }}>
            <button onClick={()=>scrollByPage(1)} disabled={!canRight}
              style={{ pointerEvents:"auto",width:44,height:44,background:canRight?C.ink:"transparent",color:canRight?"#fff":C.border,border:`1px solid ${canRight?C.ink:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.18s cubic-bezier(0.22,1,0.36,1)",cursor:canRight?"pointer":"default" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          {/* Scroller */}
          <div ref={scrollerRef}
            style={{ display:"flex",gap:12,overflowX:"auto",scrollSnapType:"x mandatory",paddingLeft:40,paddingRight:40,paddingBottom:16,scrollbarWidth:"none",cursor:"grab",userSelect:"none" }}>
            {PORTFOLIO.map((p,i) => {
              const isLg = p.size === "lg";
              return (
                <div key={i} style={{ flex:"0 0 auto",width:isLg?"min(620px,70vw)":"min(340px,52vw)",scrollSnapAlign:"start" }}>
                  <div className="rimg reveal" style={{ overflow:"hidden",aspectRatio:isLg?"3/2":"4/5",transitionDelay:`${i*0.05}s` }}>
                    <img src={p.img} alt={p.title} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginTop:14,gap:12 }}>
                    <div>
                      <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:6 }}>{p.loc}</p>
                      <p className="disp" style={{ fontSize:isLg?22:18,fontWeight:400,lineHeight:1.2,maxWidth:"22ch" }}>{p.title}</p>
                    </div>
                    <span style={{ fontSize:11,color:C.border,letterSpacing:"0.1em",paddingTop:2,flexShrink:0 }}>{p.n}</span>
                  </div>
                  <p style={{ fontSize:12,color:C.mid,marginTop:6 }}>{p.bed} bed · {p.bath} ba · {p.sqft} sqft</p>
                </div>
              );
            })}
            <div style={{ flex:"0 0 1px" }} />
          </div>

          {/* Progress bar */}
          <div style={{ padding:"0 40px",marginTop:8 }}>
            <div style={{ height:1,background:C.border,position:"relative" }}>
              <div style={{ position:"absolute",top:-1,left:0,height:3,background:C.ink,width:`${Math.max(6,progress*100)}%`,transition:"width 160ms linear" }} />
            </div>
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section id="studio" style={{ borderTop:`1px solid ${C.border}`,padding:"88px 40px",background:C.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          {/* Photo */}
          <div className="reveal" style={{ position:"relative",overflow:"hidden" }}>
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80" alt="Camera"
                 style={{ width:"100%",aspectRatio:"4/5",objectFit:"cover",display:"block" }} />
          </div>
          {/* Copy */}
          <div className="reveal" style={{ transitionDelay:"0.12s" }}>
            {label("02 — Studio")}
            <h2 className="disp" style={{ fontSize:"clamp(40px,4.5vw,68px)",fontWeight:500,lineHeight:1.05,letterSpacing:"-0.02em",marginTop:20,marginBottom:24 }}>
              One photographer.<br/>Every shoot.
            </h2>
            <p style={{ fontSize:15,color:C.mid,lineHeight:1.75,marginBottom:14 }}>
              DSK operates as an independent, single-operator studio, no teams, no subcontractors.
            </p>
            <p style={{ fontSize:15,color:C.mid,lineHeight:1.75 }}>
              Every listing is handled personally from shoot to final delivery.
            </p>
            <div style={{ height:1,background:C.border,margin:"32px 0" }} />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {[["1:1","Client Focus"],["48h","Avg turnaround"],["12d","Median days-on-market"]].map(([n,l])=>(
                <div key={n}>
                  <p className="disp" style={{ fontSize:44,fontWeight:500,lineHeight:1 }}>{n}</p>
                  <p style={{ fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:C.mid,marginTop:8 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" style={{ borderTop:`1px solid ${C.border}`,padding:"88px 40px",background:C.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:48 }}>
            {label("03 — Packages")}
            <h2 className="disp" style={{ fontSize:"clamp(52px,7vw,96px)",fontWeight:500,lineHeight:1,letterSpacing:"-0.02em",marginTop:12 }}>
              Packages.
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:`1px solid ${C.border}` }}>
            {/* Photos */}
            <div className="reveal" style={{ padding:"48px 40px",background:C.card,borderRight:`1px solid ${C.border}` }}>
              {label("Photos")}
              <div style={{ marginTop:24,marginBottom:8 }}>
                <span style={{ fontSize:28,fontWeight:300,verticalAlign:"super",lineHeight:1 }}>$</span>
                <span className="disp" style={{ fontSize:88,fontWeight:500,lineHeight:1,letterSpacing:"-0.04em" }}>150</span>
              </div>
              <p style={{ fontSize:11,color:C.mid,marginBottom:24 }}>starting</p>
              <p style={{ fontSize:14,color:C.ink,lineHeight:1.65,marginBottom:28 }}>
                Clean, honest listing photography.<br/>Most single-family homes.
              </p>
              <div style={{ height:1,background:C.border,marginBottom:24 }} />
              {["Up to 25 edited images","Interior + exterior","24-hour turnaround","MLS-sized + full-res"].map(f=>(
                <div key={f} style={{ display:"flex",alignItems:"center",gap:14,marginBottom:8 }}>
                  <span style={{ fontSize:14,color:C.mid }}>—</span>
                  <span style={{ fontSize:13,color:C.ink }}>{f}</span>
                </div>
              ))}
              <a href={CAL_STD} target="_blank" rel="noreferrer"
                 style={{ display:"block",textAlign:"center",marginTop:40,padding:"14px",fontSize:13,fontWeight:400,color:C.ink,textDecoration:"none",border:`1px solid ${C.ink}`,transition:"opacity 0.2s" }}
                 onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Book Photos
              </a>
            </div>
            {/* Photos + Video */}
            <div className="reveal" style={{ padding:"48px 40px",background:C.dark,transitionDelay:"0.1s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                {label("Photos + Video", true)}
                <span style={{ fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:C.accent,fontWeight:500 }}>Most Booked</span>
              </div>
              <div style={{ marginTop:24,marginBottom:8 }}>
                <span style={{ fontSize:28,fontWeight:300,color:"#fff",verticalAlign:"super",lineHeight:1 }}>$</span>
                <span className="disp" style={{ fontSize:88,fontWeight:500,lineHeight:1,letterSpacing:"-0.04em",color:"#fff" }}>400</span>
              </div>
              <p style={{ fontSize:11,color:"rgba(255,255,255,0.35)",marginBottom:24 }}>starting</p>
              <p style={{ fontSize:14,color:"rgba(255,255,255,0.6)",lineHeight:1.65,marginBottom:28 }}>
                Stills plus a short walkthrough video.<br/>Listings that need motion.
              </p>
              <div style={{ height:1,background:"rgba(255,255,255,0.08)",marginBottom:24 }} />
              {[["Up to 40 edited images",true],["45–60s walkthrough video",true],["Interior + exterior",true],["Vertical cut for social",true],["24-hour turnaround",false]].map(([f,hi])=>(
                <div key={f as string} style={{ display:"flex",alignItems:"center",gap:14,marginBottom:8 }}>
                  <span style={{ fontSize:14,color:C.accent }}>—</span>
                  <span style={{ fontSize:13,color:hi?"#fff":"rgba(255,255,255,0.35)" }}>{f as string}</span>
                </div>
              ))}
              <a href={CAL_ESS} target="_blank" rel="noreferrer"
                 style={{ display:"block",textAlign:"center",marginTop:40,padding:"14px",fontSize:13,fontWeight:400,color:"#fff",textDecoration:"none",border:"1px solid rgba(255,255,255,0.35)",transition:"opacity 0.2s" }}
                 onMouseEnter={e=>e.currentTarget.style.opacity="0.6"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Book Photos + Video
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section style={{ borderTop:`1px solid ${C.border}`,padding:"88px 40px",background:C.bg }}>
        <div style={{ maxWidth:640,margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:40 }}>
            {label("Request a shoot")}
            <h2 className="disp" style={{ fontSize:"clamp(36px,4vw,60px)",fontWeight:500,lineHeight:1.05,marginTop:12,letterSpacing:"-0.02em" }}>
              Tell us about<br/>the listing.
            </h2>
          </div>
          <div className="reveal" style={{ display:"flex",flexDirection:"column",gap:28 }}>
            {/* Address */}
            <div>
              <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:10 }}>Property Address</p>
              <input type="text" placeholder="123 Lincoln Ave, San Jose" style={{ width:"100%",padding:"12px 0",fontSize:14,borderBottom:`1px solid ${C.border}`,outline:"none",background:"transparent",color:C.ink }} />
            </div>
            {/* Sqft */}
            <div>
              <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:10 }}>Square Footage</p>
              <input type="text" placeholder="2,400" style={{ width:"100%",padding:"12px 0",fontSize:14,borderBottom:`1px solid ${C.border}`,outline:"none",background:"transparent",color:C.ink }} />
            </div>
            {/* Package toggle */}
            <div>
              <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:10 }}>Package</p>
              <div style={{ display:"flex",gap:0 }}>
                {(["photos","video"] as const).map(p=>(
                  <button key={p} onClick={()=>setPkg(p)} className={`pkg-btn${pkg===p?" active":""}`}
                          style={{ padding:"11px 0",fontSize:13,fontWeight:400,border:`1px solid ${C.border}`,background:pkg===p?C.ink:"#fff",color:pkg===p?"#fff":C.ink,flex:1,transition:"all 0.15s" }}>
                    {p==="photos"?"Photos":"Photos + Video"}
                  </button>
                ))}
              </div>
              <p style={{ fontSize:11,color:C.mid,marginTop:8 }}>
                {pkg==="photos"?"Shoot length: ~1.5 hr · 24-hour delivery · $150":"Shoot length: ~2.5 hr · 24-hour delivery · $400"}
              </p>
            </div>
            {/* Shoot window */}
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
              <div>
                <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:10 }}>Shoot Window</p>
                <select style={{ width:"100%",padding:"12px 0",fontSize:13,borderBottom:`1px solid ${C.border}`,outline:"none",background:"transparent",color:C.ink }}>
                  <option>8:00 am – 10:00 am</option>
                  <option>10:00 am – 12:00 pm</option>
                  <option>12:00 pm – 2:00 pm</option>
                  <option>2:00 pm – 4:00 pm</option>
                </select>
              </div>
              <div>
                <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid,marginBottom:10 }}>How Many Photos</p>
                <select style={{ width:"100%",padding:"12px 0",fontSize:13,borderBottom:`1px solid ${C.border}`,outline:"none",background:"transparent",color:C.ink }}>
                  <option>Up to {pkg==="photos"?"25":"40"} — included</option>
                </select>
              </div>
            </div>
            {/* Add-ons */}
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
                <p style={{ fontSize:10,letterSpacing:"0.18em",textTransform:"uppercase",color:C.mid }}>Add-ons</p>
                <p style={{ fontSize:10,letterSpacing:"0.1em",color:C.mid }}>{addons.size} selected · quoted separately</p>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:4 }}>
                {[
                  ["Virtual staging","per photo"],
                  ["Twilight exterior","golden / blue hour"],
                  ["Drone aerial","4–6 frames"],
                  ["2D floorplan","MLS-ready"],
                  ["3D Matterport tour","dollhouse + walkthrough"],
                  ["Vertical social reel","15–30s for IG / TikTok"],
                  ["Detail shots","finishes, hardware, texture"],
                  ["Rush delivery","same-day edit"],
                ].map(([a,sub])=>(
                  <button key={a} onClick={()=>toggleAddon(a)}
                          style={{ padding:"12px",fontSize:12,fontWeight:400,border:`1px solid ${addons.has(a)?C.ink:C.border}`,background:addons.has(a)?C.ink:"#fff",color:addons.has(a)?"#fff":C.ink,textAlign:"left",transition:"all 0.15s" }}>
                    {a}
                    <span style={{ display:"block",fontSize:10,opacity:0.45,marginTop:2 }}>{sub}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Submit */}
            <a href={pkg==="photos"?CAL_STD:CAL_ESS} target="_blank" rel="noreferrer"
               style={{ display:"block",textAlign:"center",background:C.ink,color:"#fff",padding:"16px",fontSize:13,fontWeight:400,textDecoration:"none",marginTop:8,transition:"opacity 0.2s" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Request shoot →
            </a>
            <p style={{ fontSize:11,color:C.mid,textAlign:"center" }}>No charge until the shoot is confirmed.</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ background:C.dark,borderTop:`1px solid #222`,padding:"88px 40px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div className="reveal" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:56,flexWrap:"wrap",gap:16 }}>
            <div>
              {label("04 — Reviews", true)}
              <h2 className="disp" style={{ fontSize:"clamp(44px,6vw,84px)",fontWeight:500,lineHeight:0.95,color:"#fff",letterSpacing:"-0.02em",marginTop:12 }}>
                From agents<br/>who re-book.
              </h2>
            </div>
            <p style={{ fontSize:11,letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.2)" }}>4.9 avg · growing</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0 }}>
            {REVIEWS.map((r,i)=>(
              <div key={i} className="reveal" style={{ padding:"32px 32px 32px 0",borderTop:"1px solid rgba(255,255,255,0.07)",transitionDelay:`${i*0.08}s` }}>
                <span className="disp" style={{ fontSize:36,lineHeight:1,color:C.accent }}>&ldquo;</span>
                <p className="disp" style={{ fontSize:"clamp(16px,1.8vw,22px)",color:"#fff",lineHeight:1.45,fontWeight:400,marginTop:8 }}>{r.q}</p>
                <p style={{ fontSize:11,color:"rgba(255,255,255,0.28)",marginTop:20,letterSpacing:"0.05em" }}>{r.name} — {r.co}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"112px 40px",background:C.bg,textAlign:"center",borderTop:`1px solid ${C.border}` }}>
        <div className="reveal">
          {label("Ready?")}
          <h2 className="disp" style={{ fontSize:"clamp(64px,10vw,128px)",fontWeight:500,lineHeight:0.9,letterSpacing:"-0.03em",marginTop:20,marginBottom:40 }}>
            Book the shoot.
          </h2>
          <a href={CAL_ESS} target="_blank" rel="noreferrer"
             style={{ display:"inline-block",background:C.ink,color:"#fff",padding:"16px 44px",fontSize:14,fontWeight:400,textDecoration:"none",transition:"opacity 0.2s" }}
             onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Check availability
          </a>
          <p style={{ fontSize:12,color:C.mid,marginTop:16,letterSpacing:"0.06em" }}>Typical response within 2 hours · Mon–Sat</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:C.dark,borderTop:"1px solid #1e1e1e",padding:"56px 40px 40px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:48 }}>
          <div>
            <span className="disp" style={{ fontSize:22,fontWeight:500,color:"#fff",letterSpacing:"0.18em" }}>D S K</span>
            <p style={{ fontSize:13,color:"rgba(255,255,255,0.35)",lineHeight:1.7,marginTop:12 }}>Real estate photography for the South Bay. Independent studio, based in San Jose.</p>
          </div>
          {[["Site",[["Work","#work"],["Packages","#packages"],["Reviews","#reviews"],["About","#studio"]]],
            ["Contact",[["hello@dskphoto.co","mailto:hello@dskphoto.co"],["San Jose, CA","#"]]],
            ["Elsewhere",[["Instagram ↗","https://instagram.com"]]]
          ].map(([title, links])=>(
            <div key={title as string}>
              <p style={{ fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:20 }}>{title as string}</p>
              {(links as string[][]).map(([l,h])=>(
                <a key={l} href={h} style={{ display:"block",fontSize:13,color:"rgba(255,255,255,0.45)",textDecoration:"none",marginBottom:10,transition:"opacity 0.2s" }}
                   onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
          <p style={{ fontSize:11,color:"rgba(255,255,255,0.18)",letterSpacing:"0.1em",textTransform:"uppercase" }}>© 2026 DSK Photography</p>
          <p style={{ fontSize:11,color:"rgba(255,255,255,0.18)",letterSpacing:"0.08em",textTransform:"uppercase" }}>San Jose · 37.3382° N, 121.8863° W</p>
        </div>
      </footer>
    </div>
  );
}
