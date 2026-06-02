/* global React */
// wf-gallery.jsx — tab gallery for comparing full-screen wireframe approaches.
// Screens render at 1180x760, scaled to fit. Exports Gallery to window.
const { useState, useRef, useLayoutEffect, useEffect } = React;

const BASE_W = 1180, BASE_H = 760;

function useWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(1000);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(es => { for (const e of es) setW(e.contentRect.width); });
    ro.observe(ref.current); return () => ro.disconnect();
  }, []);
  return [ref, w];
}

function Stage({ C, avail, compact }) {
  const scale = Math.min(1, avail / BASE_W);
  return <div style={{ width: BASE_W * scale, height: BASE_H * scale, flex: "0 0 auto",
    borderRadius: 10, overflow: "hidden", background: "#fff",
    boxShadow: "0 1px 2px rgba(15,23,42,.06), 0 18px 50px rgba(15,23,42,.14)", border: "1px solid #cdd6e3" }}>
    <div style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
      <div style={{ width: BASE_W, height: BASE_H }}><C /></div>
    </div>
  </div>;
}

function Gallery({ screens }) {
  const [si, setSi] = useState(0);
  const [ai, setAi] = useState(0);
  const [compare, setCompare] = useState(false);
  const [viewRef, vw] = useWidth();
  const screen = screens[si];
  useEffect(() => { setAi(0); setCompare(false); }, [si]);
  const single = screen.approaches.length === 1;
  const avail = Math.max(360, vw - 64);

  return (
    <div className="ds" style={{ height: "100%", display: "flex", flexDirection: "column", background: "#e7ebf1" }}>
      {/* header */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 14, padding: "11px 22px", background: "#fff", borderBottom: "1px solid var(--line)", boxShadow: "0 4px 16px rgba(15,23,42,.05)", zIndex: 3 }}>
        <div className="brand__mark" style={{ width: 32, height: 32 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" /></svg>
        </div>
        <div>
          <div style={{ font: "700 1.05rem/1 var(--font-display)", color: "var(--text-strong)" }}>Cooperative Cockpit · Wireframes</div>
          <div style={{ font: ".72rem var(--font-ui)", color: "var(--text-muted)", marginTop: 2 }}>Mid-fidelity layout exploration · refined OpenClaw system</div>
        </div>
        <a href="Cockpit%20Design%20System.html" className="chip is-accent" style={{ marginLeft: "auto", textDecoration: "none", cursor: "pointer" }}>View design system →</a>
      </div>

      {/* screen tabs */}
      <div style={{ flex: "0 0 auto", display: "flex", gap: 4, padding: "8px 18px", background: "#fff", borderBottom: "1px solid var(--line)", overflowX: "auto", zIndex: 2 }}>
        {screens.map((s, i) => <button key={s.id} onClick={() => setSi(i)}
          style={{ flex: "0 0 auto", border: "1px solid " + (i === si ? "color-mix(in srgb,var(--accent) 28%,#fff)" : "transparent"), background: i === si ? "color-mix(in srgb,var(--accent) 9%,#fff)" : "transparent", color: i === si ? "var(--accent)" : "var(--text-muted)", borderRadius: 6, padding: "7px 13px", font: "650 .82rem var(--font-ui)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          {s.label}<span style={{ font: ".66rem var(--font-mono)", opacity: .7 }}>{s.approaches.length}</span></button>)}
      </div>

      {/* approach controls */}
      <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 12, padding: "10px 22px", background: "#eef1f6", borderBottom: "1px solid var(--line)", flexWrap: "wrap" }}>
        <span className="phead__kicker" style={{ margin: 0 }}>{screen.label}</span>
        <span style={{ font: ".8rem var(--font-ui)", color: "var(--text-muted)" }}>{screen.sub}</span>
        <div style={{ flex: 1 }} />
        {!single && !compare && <div className="seg" style={{ background: "#fff" }}>
          {screen.approaches.map((a, i) => <button key={i} className={i === ai ? "is-on" : ""} onClick={() => setAi(i)}>{a.label}</button>)}
        </div>}
        {!single && <button className={"btn btn--sm" + (compare ? " btn--primary" : "")} onClick={() => setCompare(c => !c)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7v16H4zM13 4h7v16h-7z" /></svg>{compare ? "Comparing" : "Compare all"}</button>}
      </div>

      {/* viewer */}
      <div ref={viewRef} style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 32 }}>
        {compare && !single
          ? <div style={{ display: "flex", flexDirection: "column", gap: 36, alignItems: "center" }}>
            {screen.approaches.map((a, i) => <div key={i} style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ font: "650 .86rem var(--font-ui)", color: "var(--text-strong)" }}>{a.label}</span>
                {screen.rec === i && <span className="chip is-ready">Recommended</span>}</div>
              <Stage C={a.C} avail={avail} /></div>)}
          </div>
          : <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            {!single && screen.rec === ai && <span className="chip is-ready" style={{ alignSelf: "center" }}>Recommended direction</span>}
            <Stage C={screen.approaches[ai].C} avail={avail} />
          </div>}
      </div>
    </div>
  );
}

Object.assign(window, { Gallery });
