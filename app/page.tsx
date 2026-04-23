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

export default function Home() {
  const curDot  = useRef<HTMLDivElement>(null);
  const curRing = useRef<HTMLDivElement>(null);

  // Carousel
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (curDot.current)  { curDot.current.style.left  = e.clientX+"px"; curDot.current.style.top  = e.clientY+"px"; }
      if (curRing.current) { curRing.current.style.left = e.clientX+"px"; curRing.current.style.top = e.clientY+"px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal, .rimg").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => { el.removeEventListener("scroll", updateEdges); window.removeEventListener("resize", updateEdges); };
  }, [updateEdges]);

  useEffect(() => {
    const el = scrollerRef.current; if (!el) return;
    let down = false, startX = 0, startScroll = 0;
    const onDown = (e: MouseEvent) => { down=true; startX=e.pageX; startScroll=el.scrollLeft; el.style.cursor="grabbing"; };
    const onMove = (e: MouseEvent) => { if (!down) return; el.scrollLeft = startScroll-(e.pageX-startX); };
    const onUp   = () => { down=false; el.style.cursor="grab"; };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",   onUp);
    return () => { el.removeEventListener("mousedown", onDown); window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const scrollByPage = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * (scrollerRef.current.clientWidth * 0.8), behavior: "smooth" });
  };

  // ── Palette ──────────────────────────────────────────────────────────────
  const L = { bg:"#F7F3EC", ink:"#1C1612", mid:"#8A7F72", border:"#E5DDD0" }; // Warm cream (light sections)
  const D = { bg:"#0C0B09", ink:"#F5F0E8", mid:"#6B6057", border:"#2A2724" }; // Dark cinema (dark sections)
  const gold = "#C4A870";

  const eyebrow = (txt: string, dark=false) => (
    <p style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color: dark ? "rgba(245,240,232,0.4)" : L.mid, fontWeight:400 }}>{txt}</p>
  );

  return (
    <div style={{ background:L.bg, color:L.ink, fontFamily:"'DM Sans', system-ui, sans-serif", fontWeight:300 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{-webkit-font-smoothing:antialiased;overflow-x:hidden;}
        *,a,button,select{cursor:none!important;}
        .disp{font-family:'Cormorant Garamond',Georgia,serif;}

        @keyframes up{from{opacity:0;transform:translate3d(0,32px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
        @keyframes fadein{from{opacity:0}to{opacity:1}}
        .au{animation:up 0.95s cubic-bezier(0.22,1,0.36,1) both;will-change:transform,opacity;}
        .ai{animation:fadein 1.1s cubic-bezier(0.22,1,0.36,1) both;will-change:opacity;}
        .d1{animation-delay:.1s}.d2{animation-delay:.22s}.d3{animation-delay:.36s}.d4{animation-delay:.5s}

        .reveal{opacity:0;transform:translate3d(0,22px,0);transition:opacity 0.75s cubic-bezier(0.22,1,0.36,1),transform 0.75s cubic-bezier(0.22,1,0.36,1);will-change:transform,opacity;}
        .reveal.on{opacity:1;transform:translate3d(0,0,0);}

        .rimg img{transform:scale(1.07);opacity:0;transition:transform 1s cubic-bezier(0.22,1,0.36,1),opacity 1s cubic-bezier(0.22,1,0.36,1);will-change:transform,opacity;}
        .rimg.on img{transform:scale(1);opacity:1;}

        .nav-a{font-size:13px;color:${L.ink};text-decoration:none;opacity:0.5;transition:opacity 0.2s cubic-bezier(0.22,1,0.36,1);font-weight:400;}
        .nav-a:hover{opacity:1;}

        #work ::-webkit-scrollbar{display:none;}
      `}</style>

      {/* ── CURSOR — mix-blend-mode:difference makes it auto-invert on dark/light ── */}
      <div ref={curDot}  style={{ position:"fixed",top:0,left:0,width:7,height:7,background:"#fff",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transform:"translate(-50%,-50%)",mixBlendMode:"difference" }} />
      <div ref={curRing} style={{ position:"fixed",top:0,left:0,width:26,height:26,border:"1px solid #fff",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"left 0.28s cubic-bezier(0.22,1,0.36,1),top 0.28s cubic-bezier(0.22,1,0.36,1)",mixBlendMode:"difference" }} />

      {/* ── NAV ── */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 40px",height:64,background:"rgba(247,243,236,0.88)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${L.border}` }}>
        <span className="disp" style={{ fontSize:19,fontWeight:500,letterSpacing:"0.2em",color:L.ink }}>D S K</span>
        <div style={{ display:"flex",gap:32 }}>
          {NAV_LINKS.map(([l,h]) => <a key={l} href={h} className="nav-a">{l}</a>)}
        </div>
        <a href={CAL_ESS} target="_blank" rel="noreferrer"
           style={{ fontSize:11,fontWeight:400,letterSpacing:"0.12em",textTransform:"uppercase",color:L.ink,textDecoration:"none",border:`1px solid ${L.ink}`,padding:"9px 20px",transition:"opacity 0.2s" }}
           onMouseEnter={e=>e.currentTarget.style.opacity="0.45"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          Book a shoot
        </a>
      </nav>

      {/* ── HERO — dark cinema ── */}
      <section style={{ position:"relative",height:"100vh",minHeight:640,display:"flex",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden",background:D.bg }}>
        <div className="ai" style={{ position:"absolute",inset:0,backgroundImage:`url(${HERO})`,backgroundSize:"cover",backgroundPosition:"center 40%",willChange:"opacity" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(12,11,9,0.78) 0%,rgba(12,11,9,0.12) 45%,transparent 100%)" }} />
        <div className="au d4" style={{ position:"absolute",top:80,right:40,textAlign:"right" }}>
          <p style={{ fontSize:10,letterSpacing:"0.18em",color:"rgba(245,240,232,0.35)",textTransform:"uppercase" }}>01 / 006</p>
          <p style={{ fontSize:10,letterSpacing:"0.15em",color:"rgba(245,240,232,0.35)",textTransform:"uppercase",marginTop:2 }}>Saratoga Residence</p>
          <p style={{ fontSize:10,letterSpacing:"0.15em",color:"rgba(245,240,232,0.35)",textTransform:"uppercase",marginTop:2 }}>Twilight · 5,200 sqm</p>
        </div>
        <div style={{ position:"relative",padding:"0 40px 60px" }}>
          <p className="au" style={{ fontSize:10,letterSpacing:"0.24em",textTransform:"uppercase",color:"rgba(245,240,232,0.45)",marginBottom:18 }}>South Bay · Est. 2024</p>
          <h1 className="disp au d1" style={{ fontSize:"clamp(60px,9.5vw,132px)",lineHeight:0.9,fontWeight:400,color:D.ink,letterSpacing:"-0.02em",maxWidth:900 }}>
            Listings that move.
          </h1>
          <p className="au d2" style={{ fontSize:15,color:"rgba(245,240,232,0.6)",marginTop:22,lineHeight:1.75,maxWidth:440 }}>
            Architectural photography for South Bay real estate.<br/>Clean frames, honest light, same-week delivery.
          </p>
          <div className="au d3" style={{ display:"flex",gap:14,marginTop:32,flexWrap:"wrap" }}>
            <a href="#packages"
               style={{ display:"inline-block",background:D.ink,color:D.bg,padding:"14px 30px",fontSize:13,fontWeight:400,letterSpacing:"0.06em",textDecoration:"none",transition:"opacity 0.22s" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Book a shoot
            </a>
            <a href="#work"
               style={{ display:"inline-block",border:"1px solid rgba(245,240,232,0.4)",color:D.ink,padding:"13px 30px",fontSize:13,fontWeight:400,letterSpacing:"0.06em",textDecoration:"none",transition:"opacity 0.22s" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.55"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              View work →
            </a>
          </div>
        </div>
      </section>

      {/* ── WORK — warm cream, horizontal carousel ── */}
      <section id="work" style={{ padding:"96px 0",background:L.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto",padding:"0 40px" }}>
          <div className="reveal" style={{ marginBottom:44,display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:16 }}>
            <div>
              {eyebrow("01 — Work")}
              <h2 className="disp" style={{ fontSize:"clamp(44px,5.5vw,80px)",fontWeight:400,lineHeight:1,letterSpacing:"-0.02em",marginTop:14,color:L.ink }}>
                Recent shoots across<br/>the South Bay.
              </h2>
            </div>
            <p style={{ fontSize:11,letterSpacing:"0.14em",textTransform:"uppercase",color:L.mid }}>{PORTFOLIO.length} of 24 · 2025</p>
          </div>
        </div>

        <div style={{ position:"relative" }}>
          {/* Left arrow */}
          <div style={{ position:"absolute",top:0,bottom:56,left:0,width:44,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,pointerEvents:"none" }}>
            <button onClick={()=>scrollByPage(-1)} disabled={!canLeft}
              style={{ pointerEvents:"auto",width:42,height:42,background:canLeft?L.ink:"transparent",color:canLeft?L.bg:L.border,border:`1px solid ${canLeft?L.ink:L.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.22,1,0.36,1)",cursor:canLeft?"pointer":"default" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
            </button>
          </div>
          {/* Right arrow */}
          <div style={{ position:"absolute",top:0,bottom:56,right:0,width:44,display:"flex",alignItems:"center",justifyContent:"center",zIndex:3,pointerEvents:"none" }}>
            <button onClick={()=>scrollByPage(1)} disabled={!canRight}
              style={{ pointerEvents:"auto",width:42,height:42,background:canRight?L.ink:"transparent",color:canRight?L.bg:L.border,border:`1px solid ${canRight?L.ink:L.border}`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.22,1,0.36,1)",cursor:canRight?"pointer":"default" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          <div ref={scrollerRef}
            style={{ display:"flex",gap:14,overflowX:"auto",scrollSnapType:"x mandatory",paddingLeft:40,paddingRight:40,paddingBottom:20,scrollbarWidth:"none",cursor:"grab",userSelect:"none" }}>
            {PORTFOLIO.map((p,i) => {
              const isLg = p.size === "lg";
              return (
                <div key={i} style={{ flex:"0 0 auto",width:isLg?"min(620px,70vw)":"min(340px,52vw)",scrollSnapAlign:"start" }}>
                  <div className="rimg reveal" style={{ overflow:"hidden",aspectRatio:isLg?"3/2":"4/5",transitionDelay:`${i*0.06}s`,background:L.border }}>
                    <img src={p.img} alt={p.title} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }} />
                  </div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginTop:16,gap:12 }}>
                    <div>
                      <p style={{ fontSize:10,letterSpacing:"0.2em",textTransform:"uppercase",color:L.mid,marginBottom:7 }}>{p.loc}</p>
                      <p className="disp" style={{ fontSize:isLg?22:18,fontWeight:400,lineHeight:1.2,color:L.ink }}>{p.title}</p>
                    </div>
                    <span style={{ fontSize:11,color:L.border,letterSpacing:"0.1em",paddingTop:2,flexShrink:0 }}>{p.n}</span>
                  </div>
                  <p style={{ fontSize:12,color:L.mid,marginTop:7 }}>{p.bed} bed · {p.bath} ba · {p.sqft} sqft</p>
                </div>
              );
            })}
            <div style={{ flex:"0 0 1px" }} />
          </div>

          {/* Progress bar */}
          <div style={{ padding:"0 40px",marginTop:4 }}>
            <div style={{ height:1,background:L.border,position:"relative" }}>
              <div style={{ position:"absolute",top:-1,left:0,height:3,background:L.ink,width:`${Math.max(6,progress*100)}%`,transition:"width 160ms linear" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDIO — warm cream ── */}
      <section id="studio" style={{ borderTop:`1px solid ${L.border}`,padding:"96px 40px",background:L.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center" }}>
          {/* 4:5 crop window — video is 9:16 so top/bottom get clipped */}
          <div className="reveal" style={{ position:"relative",width:"100%",aspectRatio:"4/5",overflow:"hidden",background:"#000" }}>
            <video
              autoPlay muted loop playsInline
              style={{ position:"absolute",top:"50%",left:0,transform:"translateY(-50%)",width:"100%",height:"142%",objectFit:"cover" }}
            >
              <source src="/studio.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="reveal" style={{ transitionDelay:"0.14s" }}>
            {eyebrow("02 — Studio")}
            <h2 className="disp" style={{ fontSize:"clamp(40px,4.5vw,68px)",fontWeight:400,lineHeight:1.05,letterSpacing:"-0.02em",marginTop:22,marginBottom:24,color:L.ink }}>
              One photographer.<br/>Every shoot.
            </h2>
            <p style={{ fontSize:15,color:L.mid,lineHeight:1.8,marginBottom:14 }}>
              DSK operates as an independent, single-operator studio — no teams, no subcontractors.
            </p>
            <p style={{ fontSize:15,color:L.mid,lineHeight:1.8 }}>
              Every listing is handled personally from shoot to final delivery.
            </p>
            <div style={{ height:1,background:L.border,margin:"36px 0" }} />
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
              {[["1:1","Client Focus"],["48h","Avg turnaround"],["12d","Days on market"]].map(([n,l])=>(
                <div key={n}>
                  <p className="disp" style={{ fontSize:46,fontWeight:400,lineHeight:1,color:L.ink }}>{n}</p>
                  <p style={{ fontSize:10,letterSpacing:"0.16em",textTransform:"uppercase",color:L.mid,marginTop:10 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PACKAGES — warm cream + dark card ── */}
      <section id="packages" style={{ borderTop:`1px solid ${L.border}`,padding:"96px 40px",background:L.bg }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div className="reveal" style={{ marginBottom:52 }}>
            {eyebrow("03 — Packages")}
            <h2 className="disp" style={{ fontSize:"clamp(52px,7vw,96px)",fontWeight:400,lineHeight:1,letterSpacing:"-0.02em",marginTop:14,color:L.ink }}>
              Packages.
            </h2>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,border:`1px solid ${L.border}` }}>

            {/* Photos — light */}
            <div className="reveal" style={{ padding:"52px 44px",background:"#EDEAE2",borderRight:`1px solid ${L.border}` }}>
              {eyebrow("Photos")}
              <div style={{ marginTop:28,marginBottom:6,display:"flex",alignItems:"flex-start",gap:4 }}>
                <span style={{ fontSize:24,fontWeight:300,color:L.mid,marginTop:12,lineHeight:1 }}>$</span>
                <span className="disp" style={{ fontSize:96,fontWeight:400,lineHeight:1,letterSpacing:"-0.04em",color:L.ink }}>120</span>
              </div>
              <p style={{ fontSize:11,color:L.mid,marginBottom:28,letterSpacing:"0.08em" }}>starting</p>
              <p style={{ fontSize:14,color:L.ink,lineHeight:1.7,marginBottom:32 }}>
                Clean, honest listing photography.<br/>Most single-family homes.
              </p>
              <div style={{ height:1,background:L.border,marginBottom:28 }} />
              {["Up to 25 edited images","Interior + exterior","24-hour turnaround","MLS-sized + full-res"].map(f=>(
                <div key={f} style={{ display:"flex",alignItems:"center",gap:14,marginBottom:10 }}>
                  <span style={{ fontSize:13,color:gold }}>—</span>
                  <span style={{ fontSize:13,color:L.ink }}>{f}</span>
                </div>
              ))}
              <a href={CAL_STD} target="_blank" rel="noreferrer"
                 style={{ display:"block",textAlign:"center",marginTop:44,padding:"15px",fontSize:12,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:L.ink,textDecoration:"none",border:`1px solid ${L.ink}`,transition:"opacity 0.2s" }}
                 onMouseEnter={e=>e.currentTarget.style.opacity="0.45"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Book Photos
              </a>
            </div>

            {/* Photos + Video — dark */}
            <div className="reveal" style={{ padding:"52px 44px",background:D.bg,transitionDelay:"0.1s" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                {eyebrow("Photos + Video", true)}
                <span style={{ fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:gold,fontWeight:500 }}>Most Booked</span>
              </div>
              <div style={{ marginTop:28,marginBottom:6,display:"flex",alignItems:"flex-start",gap:4 }}>
                <span style={{ fontSize:24,fontWeight:300,color:D.mid,marginTop:12,lineHeight:1 }}>$</span>
                <span className="disp" style={{ fontSize:96,fontWeight:400,lineHeight:1,letterSpacing:"-0.04em",color:D.ink }}>250</span>
              </div>
              <p style={{ fontSize:11,color:D.mid,marginBottom:28,letterSpacing:"0.08em" }}>starting</p>
              <p style={{ fontSize:14,color:"rgba(245,240,232,0.65)",lineHeight:1.7,marginBottom:32 }}>
                Stills plus a cinematic walkthrough video.<br/>Listings that need motion.
              </p>
              <div style={{ height:1,background:D.border,marginBottom:28 }} />
              {[["Up to 40 edited images",true],["45–60s walkthrough video",true],["Interior + exterior",true],["Vertical cut for social",true],["24-hour turnaround",false]].map(([f,hi])=>(
                <div key={f as string} style={{ display:"flex",alignItems:"center",gap:14,marginBottom:10 }}>
                  <span style={{ fontSize:13,color:gold }}>—</span>
                  <span style={{ fontSize:13,color:hi?"#fff":"rgba(245,240,232,0.3)" }}>{f as string}</span>
                </div>
              ))}
              <a href={CAL_ESS} target="_blank" rel="noreferrer"
                 style={{ display:"block",textAlign:"center",marginTop:44,padding:"15px",fontSize:12,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:D.ink,textDecoration:"none",border:`1px solid rgba(245,240,232,0.3)`,transition:"opacity 0.2s" }}
                 onMouseEnter={e=>e.currentTarget.style.opacity="0.5"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Book Photos + Video
              </a>
            </div>
          </div>

          {/* Free quote card */}
          <div className="reveal" style={{ marginTop:2,border:`1px solid ${L.border}`,borderTop:"none",padding:"32px 44px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:24,flexWrap:"wrap",background:"#F2EEE6" }}>
            <div>
              <p style={{ fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:gold,marginBottom:8 }}>Custom shoot</p>
              <p className="disp" style={{ fontSize:24,fontWeight:400,color:L.ink,letterSpacing:"-0.01em" }}>Larger home, unusual scope, or add-ons?</p>
              <p style={{ fontSize:13,color:L.mid,marginTop:6,lineHeight:1.65 }}>Tell me what the listing needs — I'll send a free personalized quote the same day.</p>
            </div>
            <a href={`mailto:hello@dskphoto.co?subject=Custom shoot quote`}
               style={{ flexShrink:0,padding:"13px 28px",fontSize:12,fontWeight:400,letterSpacing:"0.1em",textTransform:"uppercase",color:L.ink,textDecoration:"none",border:`1px solid ${L.ink}`,transition:"opacity 0.2s",whiteSpace:"nowrap" }}
               onMouseEnter={e=>e.currentTarget.style.opacity="0.45"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Get a free quote →
            </a>
          </div>
        </div>
      </section>

      {/* ── REVIEWS — dark cinema ── */}
      <section id="reviews" style={{ background:D.bg,borderTop:`1px solid ${D.border}`,padding:"96px 40px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto" }}>
          <div className="reveal" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60,flexWrap:"wrap",gap:16 }}>
            <div>
              {eyebrow("04 — Reviews", true)}
              <h2 className="disp" style={{ fontSize:"clamp(44px,6vw,84px)",fontWeight:400,lineHeight:0.95,color:D.ink,letterSpacing:"-0.02em",marginTop:14 }}>
                From agents<br/>who re-book.
              </h2>
            </div>
            <p style={{ fontSize:11,letterSpacing:"0.16em",textTransform:"uppercase",color:D.mid }}>4.9 avg · growing</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0 }}>
            {REVIEWS.map((r,i)=>(
              <div key={i} className="reveal" style={{ padding:"36px 36px 36px 0",borderTop:`1px solid ${D.border}`,transitionDelay:`${i*0.09}s` }}>
                <span className="disp" style={{ fontSize:40,lineHeight:1,color:gold }}>&ldquo;</span>
                <p className="disp" style={{ fontSize:"clamp(17px,1.8vw,23px)",color:D.ink,lineHeight:1.5,fontWeight:400,marginTop:10 }}>{r.q}</p>
                <p style={{ fontSize:11,color:D.mid,marginTop:22,letterSpacing:"0.06em" }}>{r.name} — {r.co}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER — dark cinema ── */}
      <footer style={{ background:D.bg,borderTop:`1px solid ${D.border}`,padding:"60px 40px 44px" }}>
        <div style={{ maxWidth:1120,margin:"0 auto",display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:40,marginBottom:52 }}>
          <div>
            <span className="disp" style={{ fontSize:22,fontWeight:400,color:D.ink,letterSpacing:"0.2em" }}>D S K</span>
            <p style={{ fontSize:13,color:D.mid,lineHeight:1.75,marginTop:14 }}>Real estate photography for the South Bay.<br/>Independent studio, based in San Jose.</p>
          </div>
          {[
            ["Site",     [["Work","#work"],["Packages","#packages"],["Reviews","#reviews"],["About","#studio"]]],
            ["Contact",  [["hello@dskphoto.co","mailto:hello@dskphoto.co"],["San Jose, CA","#"]]],
            ["Elsewhere",[["Instagram ↗","https://instagram.com"]]],
          ].map(([title, links])=>(
            <div key={title as string}>
              <p style={{ fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:D.mid,marginBottom:20 }}>{title as string}</p>
              {(links as string[][]).map(([l,h])=>(
                <a key={l} href={h} style={{ display:"block",fontSize:13,color:"rgba(245,240,232,0.4)",textDecoration:"none",marginBottom:12,transition:"color 0.2s" }}
                   onMouseEnter={e=>e.currentTarget.style.color=D.ink} onMouseLeave={e=>e.currentTarget.style.color="rgba(245,240,232,0.4)"}>{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:`1px solid ${D.border}`,paddingTop:24,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8 }}>
          <p style={{ fontSize:11,color:D.mid,letterSpacing:"0.1em",textTransform:"uppercase" }}>© 2026 DSK Photography</p>
          <p style={{ fontSize:11,color:D.mid,letterSpacing:"0.08em",textTransform:"uppercase" }}>San Jose · 37.3382° N, 121.8863° W</p>
        </div>
      </footer>
    </div>
  );
}
