/* global React */
// wf-shell.jsx — shared chrome + atoms, faithful to the OpenClaw MVP shell.
// Exports to window: Icon, Shell, Chip, Btn, IconBtn, Seg, StatCard, Banner,
//                    Skel, CodeChip, PageHead, Panel

const PATHS = {
  shield: "M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z",
  home: "M4 10.5L12 4l8 6.5M6 9.5V20h12V9.5",
  workbench: "M4 5h6v6H4zM14 13h6v6h-6zM10 8h4M8 11v4h6",
  spec: "M7 3h7l4 4v14H7zM14 3v4h4M9 12h7M9 16h5",
  review: "M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6zM9 11.5l2 2 4-4",
  preview: "M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  decisions: "M5 4v16M5 6l8-2 6 4-6 2zM3 20h8",
  trace: "M9 13a4 4 0 005.7 0l2.3-2.3a4 4 0 00-5.7-5.7L10 6M15 11a4 4 0 00-5.7 0L7 13.3a4 4 0 005.7 5.7L14 18",
  rules: "M12 3v18M6 7l-3 7h6zM18 7l-3 7h6zM6 7h12M9 20h6",
  lock: "M6 10V8a6 6 0 0112 0v2M5 10h14v10H5zM12 14v3",
  link: "M9 13a4 4 0 005.7 0l2.3-2.3a4 4 0 00-5.7-5.7L10 6M15 11a4 4 0 00-5.7 0L7 13.3a4 4 0 005.7 5.7L14 18",
  reset: "M4 9a8 8 0 0114-3l2 2M20 4v4h-4M20 15a8 8 0 01-14 3l-2-2M4 20v-4h4",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  filter: "M3 5h18l-7 8v6l-4-2v-4z",
  layout: "M3 4h18v16H3zM3 9h18M9 9v11",
  upload: "M12 16V4M8 8l4-4 4 4M5 16v4h14v-4",
  pause: "M9 5v14M15 5v14",
  warn: "M12 4l9 16H3zM12 10v4M12 17h.01",
  check: "M5 12l4 4L19 7",
  plus: "M12 5v14M5 12h14", minus: "M5 12h14",
  chevron: "M9 6l6 6-6 6", chevdown: "M6 9l6 6 6-6",
  context: "M7 8l-3 4 3 4M17 8l3 4-3 4M14 4l-4 16",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  branch: "M6 4v9a3 3 0 003 3h6M6 4a2 2 0 100 4 2 2 0 000-4zm12 9a2 2 0 100 4 2 2 0 000-4z",
  archive: "M3 6h18v4H3zM5 10v10h14V10M9 14h6",
  expand: "M4 9V4h5M20 15v5h-5M4 15v5h5M20 9V4h-5",
  fit: "M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
};
function Icon({ n, s = 18, sw = 1.9, style }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}><path d={PATHS[n]} /></svg>;
}

/* atoms */
function Chip({ kind, solid, noDot, children }) {
  return <span className={"chip " + (solid ? "chip--solid " : "") + (noDot ? "no-dot " : "") + (kind ? "is-" + kind : "")}>{children}</span>;
}
function Btn({ kind, icon, sm, iconOnly, disabled, children }) {
  return <button className={"btn " + (kind ? "btn--" + kind + " " : "") + (sm ? "btn--sm " : "") + (iconOnly ? "btn--icon" : "")} disabled={disabled}>
    {icon && <Icon n={icon} s={15} />}{children}</button>;
}
function IconBtn({ icon, s = 16 }) { return <button className="iconbtn"><Icon n={icon} s={s} /></button>; }
function Seg({ opts, on, tone }) {
  return <div className="seg">{opts.map(o => <button key={o} className={(o === on ? "is-on " : "") + (tone ? "tone-" + tone : "")}>{o}</button>)}</div>;
}
function StatCard({ icon, tone = "active", label, num, sub }) {
  return <div className={"statcard tone-" + tone}>
    <div className="statcard__icon"><Icon n={icon} s={20} /></div>
    <div style={{ minWidth: 0 }}><div className="statcard__lbl">{label}</div><div className="statcard__num">{num}</div><div className="statcard__sub">{sub}</div></div>
  </div>;
}
function Banner({ kind = "wait", icon = "warn", children }) { return <div className={"banner is-" + kind}><Icon n={icon} s={18} />{children}</div>; }
function Skel({ w = "100%", h = 9, style }) { return <div className="skel" style={{ width: w, height: h, ...style }} />; }
function CodeChip({ children }) { return <span className="code">{children}</span>; }
function Panel({ title, sub, right, pad = true, children, style, className = "" }) {
  return <div className={"panel " + (pad ? "panel--pad " : "") + className} style={style}>
    {(title || right) && <div className="row between" style={{ marginBottom: sub ? 4 : 10, alignItems: "flex-start" }}>
      <div>{title && <div className="panel__title">{title}</div>}{sub && <div className="panel__sub">{sub}</div>}</div>{right}</div>}
    {children}</div>;
}
function PageHead({ kicker, gov, title, sub, right }) {
  return <div className={"phead" + (gov ? " phead--gov" : "")}>
    <div><div className="phead__kicker">{kicker}</div><h1 className="phead__title">{title}</h1>{sub && <p className="phead__sub">{sub}</p>}</div>
    {right && <div className="row gap2 wrap" style={{ justifyContent: "flex-end" }}>{right}</div>}
  </div>;
}

/* shell */
const NAV = {
  Workflow: [["home", "Home", "home"], ["workbench", "Workbench", "workbench"], ["spec", "Spec Builder", "spec"], ["review", "Review Runs", "review"], ["preview", "Preview", "preview"]],
  Governance: [["decisions", "Decisions", "decisions"], ["trace", "Trace & Evidence", "trace"], ["rules", "Rules & Scope", "rules"]],
};
function Shell({ active, stage = ["Concept", "Concept intake"], stageBlocked, readiness = 46, gates = "12 / 26 gates clear",
  handoffReady, inspector, children }) {
  return (
    <div className="ds" style={{ height: "100%" }}>
      <div className={"app" + (inspector ? " has-inspector" : "")}>
        <div className="topbar">
          <div className="brand">
            <div className="brand__mark"><Icon n="shield" s={20} /></div>
            <div style={{ minWidth: 0 }}><div className="brand__name">OpenClaw</div><div className="brand__sub">Governed Workflow Studio</div></div>
          </div>
          <div className={"stage" + (stageBlocked ? " is-blocked" : "")}>
            <span className="stage__k">Stage</span><span className="stage__v">{stage[0]}</span><span className="stage__d">{stage[1]}</span>
          </div>
          <div className="topbar__right">
            <Chip kind="handoff">Local preview</Chip>
            <IconBtn icon="pause" /><IconBtn icon="layout" /><IconBtn icon="preview" /><IconBtn icon="review" />
            <Btn kind={handoffReady ? "primary" : ""} icon="upload" disabled={!handoffReady}>Handoff</Btn>
          </div>
        </div>

        <div className="rail">
          <div className="rail-progress">
            <div className="rail-progress__head"><span>Readiness</span><strong>{readiness}%</strong></div>
            <div className="rail-bar"><i style={{ width: readiness + "%" }} /></div>
            <div className="rail-progress__cap">{gates}</div>
          </div>
          <ul className="nav">
            {Object.entries(NAV).map(([sec, items]) => <React.Fragment key={sec}>
              <li className="nav__section">{sec}</li>
              {items.map(([id, label, icon]) => <li key={id} className={"nav__item" + (active === id ? " is-active" : "")}><Icon n={icon} s={18} />{label}</li>)}
            </React.Fragment>)}
          </ul>
          <div className="rail__spacer" />
          <div className="rail-status"><span className="chip is-ready">Local workspace</span></div>
        </div>

        <div className="main">{children}</div>
        {inspector && <div className="inspector">{inspector}</div>}

        <div className="strip">
          <div className="strip__item is-block"><span className="strip__dot" /><strong>Runtime mutation</strong><span>Unavailable</span></div>
          <div className="strip__item is-handoff"><span className="strip__dot" /><strong>Repo writes</strong><span>Handoff only</span></div>
          <div className="strip__item is-allow"><span className="strip__dot" /><strong>Artifact drafting</strong><span>Allowed</span></div>
          <div className="strip__item is-spec"><span className="strip__dot" /><strong>Dynamic UI</strong><span>Spec first</span></div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Shell, Chip, Btn, IconBtn, Seg, StatCard, Banner, Skel, CodeChip, PageHead, Panel });
