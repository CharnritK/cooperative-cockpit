/* global React, Shell, Chip, Btn, IconBtn, Seg, Icon, PageHead, CodeChip, Panel */
// workbench.jsx — 3 layout approaches for the Workbench. Exports WorkbenchA/B/C.

const TYPE_ICON = { intake: "spark", context: "branch", spec: "spec", review: "review", preview: "preview", decision: "lock", trace: "trace", handoff: "archive" };
const STATUS_CHIP = { ready: ["ready", "Ready"], draft: ["neutral", "Draft"], "needs-lock": ["wait", "Needs lock"], "needs-evidence": ["wait", "Needs evidence"], "needs-sync": ["active", "Needs sync"], blocked: ["block", "Blocked"], "review-blocked": ["block", "Review blocked"], "needs-decision": ["wait", "Needs decision"] };

// node card used across approaches
function WBNode({ d, selected, style, abs }) {
  const tone = d.readiness === "ready" ? "ready" : d.readiness === "blocked" ? "block"
    : d.readiness === "needs-sync" ? "handoff" : "wait";
  const [ck, cl] = STATUS_CHIP[d.readiness] || ["neutral", d.readiness];
  return <div className={"node tone-" + tone + (selected ? " is-selected" : "")} style={{ ...(abs ? { position: "absolute" } : {}), ...style }}>
    <div className="node__top">
      <div className={"node__icon t-" + d.type}><Icon n={TYPE_ICON[d.type]} s={16} /></div>
      <div style={{ minWidth: 0 }}><div className="node__type">{d.typeLabel}</div><div className="node__label">{d.title}</div></div>
      <span className="node__index mono">{d.index}</span>
    </div>
    <div className="node__sub">{d.subtitle}</div>
    <div className="node__metrics">
      <Chip kind={ck} noDot>{cl}</Chip>
      {d.blockerCount > 0 && <span className="node-metric is-blocker">{d.blockerCount} open</span>}
      <span className="node-metric is-evidence">{d.evidenceCount} ev</span>
    </div>
  </div>;
}

const NODES = {
  intake: { type: "intake", typeLabel: "Context", index: "01", title: "Goal Intake", subtitle: "Frames the Work Packet before drafting.", readiness: "ready", blockerCount: 0, evidenceCount: 2 },
  context: { type: "context", typeLabel: "Context", index: "02", title: "Safe Selected Context", subtitle: "Separates usable context from exclusions.", readiness: "ready", blockerCount: 0, evidenceCount: 3 },
  spec: { type: "spec", typeLabel: "Work Packet", index: "03", title: "Spec Assembly", subtitle: "Turns context into controlled requirements.", readiness: "draft", blockerCount: 3, evidenceCount: 2 },
  review: { type: "review", typeLabel: "Review Gate", index: "04", title: "Advisory Review", subtitle: "Inspect-only review findings.", readiness: "review-blocked", blockerCount: 2, evidenceCount: 2 },
  preview: { type: "preview", typeLabel: "Evidence", index: "05", title: "Preview Evidence", subtitle: "Local artifact coverage state.", readiness: "needs-sync", blockerCount: 1, evidenceCount: 1 },
  decision: { type: "decision", typeLabel: "Decision", index: "06", title: "Point Decision", subtitle: "Unresolved approvals before handoff.", readiness: "needs-decision", blockerCount: 1, evidenceCount: 1 },
  trace: { type: "trace", typeLabel: "Evidence", index: "07", title: "Trace Evidence Map", subtitle: "Links sources, fields, decisions.", readiness: "needs-evidence", blockerCount: 2, evidenceCount: 4 },
  handoff: { type: "handoff", typeLabel: "Handoff", index: "08", title: "Handoff Packet", subtitle: "Collects ready artifacts, no repo write.", readiness: "blocked", blockerCount: 5, evidenceCount: 1 },
};

function ContextDock({ compact }) {
  return <div className="col gap3">
    <div className="row between" style={{ alignItems: "flex-start" }}>
      <div><span className="dock-eyebrow">Context Dock</span>
        <div className="panel__title" style={{ fontSize: "1rem", marginTop: 3 }}>PR-1: Sandbox &amp; Governance</div></div>
      <Chip kind="ready">Ready</Chip>
    </div>
    <p className="muted" style={{ fontSize: ".76rem" }}>Ensures safe, inspect-only local browser boundaries.</p>
    <dl className="dock-meta" style={{ margin: 0 }}>
      <div><dt>Layer</dt><dd>Requirement</dd></div><div><dt>Open</dt><dd>0</dd></div><div><dt>Evidence</dt><dd>3</dd></div>
    </dl>
    {!compact && <>
      <div className="col gap2" style={{ paddingTop: 10, borderTop: "1px solid var(--line)" }}>
        <h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Selected Context</h4>
        <p className="muted" style={{ fontSize: ".74rem" }}>Goal Intake · Context Selector</p></div>
      <div className="col gap2" style={{ paddingTop: 10, borderTop: "1px solid var(--line)" }}>
        <h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Protected Exclusions</h4>
        <p className="muted" style={{ fontSize: ".74rem" }}>Runtime state · Secrets · Repo write authority</p></div>
    </>}
    <div className="dock-guidance">Static copilot guidance: discuss architecture scope using the selected object. Local only — never sends prompts or calls AI services.</div>
  </div>;
}

function Toolbar({ mode = "Board" }) {
  return <div className="canvas-toolbar">
    <Btn sm icon="grid">Object types</Btn>
    <Btn sm icon="branch">Selected Context <span className="chip is-accent no-dot" style={{ minHeight: 18, padding: "1px 6px" }}>2</span></Btn>
    <Seg opts={["Board", "Mixed", "Flat"]} on={mode} />
    <span style={{ width: 1, height: 22, background: "var(--line)" }} />
    <IconBtn icon="minus" /><span className="zoomlevel">58%</span><IconBtn icon="plus" />
    <IconBtn icon="fit" /><IconBtn icon="reset" />
  </div>;
}

/* A — Spatial Board (refined current): zoned canvas, nodes, edges, floating dock. */
function WorkbenchA() {
  const place = [["intake", "8%", "20%"], ["context", "32%", "12%"], ["spec", "57%", "26%"], ["decision", "12%", "66%"], ["trace", "40%", "70%"], ["handoff", "66%", "62%"]];
  return <Shell active="workbench" stage={["Spec", "Whole architecture"]}>
    <PageHead kicker="Spatial Board" title="Workbench" sub="COCKPIT-MVP-015 · arrange the SpecGraph and inspect any object."
      right={<><Chip kind="active">Board view</Chip><Btn sm icon="filter">Open work</Btn></>} />
    <Panel pad={false} className="grow" style={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
      <div className="canvas" style={{ position: "absolute", inset: 0, borderRadius: 8 }}>
        <div style={{ position: "absolute", top: 12, left: 14, right: 14, display: "flex", justifyContent: "space-between", zIndex: 6 }}>
          <span className="zone__lbl" style={{ position: "static" }}>COCKPIT-MVP-015 / Spatial Board</span>
        </div>
        <div style={{ position: "absolute", top: 50, right: 14, zIndex: 10 }}><Toolbar /></div>
        {/* zones */}
        <div className="zone" style={{ left: "4%", top: "10%", width: "62%", height: "34%" }}><span className="zone__lbl">Product requirements</span></div>
        <div className="zone" style={{ left: "6%", top: "52%", width: "74%", height: "38%" }}><span className="zone__lbl">Task flow &amp; handoff path</span></div>
        {/* edges */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}>
          <path className="edge-validated" d="M170 175 C 280 160, 330 150, 430 150" fill="none" strokeWidth="1.8" />
          <path className="edge-pending" d="M560 185 C 640 220, 520 360, 360 470" fill="none" strokeWidth="1.8" />
          <path className="edge-risk" d="M300 500 C 420 470, 520 470, 600 460" fill="none" strokeWidth="1.8" />
        </svg>
        {place.map(([k, left, top]) => <WBNode key={k} d={NODES[k]} abs selected={k === "context"}
          style={{ left, top, transform: "scale(.92)", transformOrigin: "top left", zIndex: 2 }} />)}
        {/* floating context dock */}
        <div className="panel" style={{ position: "absolute", top: 100, right: 18, width: 312, padding: 12, zIndex: 8, boxShadow: "var(--shadow-pop)" }}>
          <ContextDock />
        </div>
        {/* legend */}
        <div className="panel--pad" style={{ position: "absolute", left: 12, bottom: 12, background: "rgba(255,255,255,.94)", border: "1px solid var(--line)", borderRadius: 6, padding: 9, font: ".72rem var(--font-ui)", zIndex: 4 }}>
          <div style={{ font: "700 .72rem var(--font-ui)", color: "var(--text-strong)", marginBottom: 6 }}>Edge legend</div>
          <div className="col gap2">
            {[["edge-validated", "Validated"], ["edge-pending", "Pending"], ["edge-risk", "Risk"]].map(([c, l]) =>
              <div key={l} className="row gap2"><span style={{ width: 24, height: 2, borderRadius: 9, background: c === "edge-validated" ? "rgba(22,163,74,.64)" : c === "edge-pending" ? "repeating-linear-gradient(90deg,rgba(217,119,6,.64) 0 6px,transparent 6px 10px)" : "repeating-linear-gradient(90deg,rgba(220,38,38,.58) 0 4px,transparent 4px 8px)" }} /><span className="muted">{l}</span></div>)}
          </div>
        </div>
      </div>
    </Panel>
  </Shell>;
}

/* B — Three-pane editor: object outline + canvas + docked inspector + readiness queue.
   Trades free spatial layout for a navigable, always-on-inspector workspace. */
function WorkbenchB() {
  const outline = [["PR-1: Sandbox & Governance", "Requirement", 0, false], ["Governed UI Canvas Engine", "Architecture", 1, false],
    ["Interactive Canvas Flow", "Component", 2, false], ["Safe Selected Context", "Context", 2, true], ["Spec Assembly", "Work Packet", 1, false],
    ["Advisory Review", "Review Gate", 1, false], ["Point Decision", "Decision", 1, false], ["Handoff Packet", "Handoff", 1, false]];
  const inspector = <>
    <div className="row between"><div className="panel__title" style={{ fontSize: "1rem" }}>Inspector</div><Chip kind="ready">Ready</Chip></div>
    <div className="seg" style={{ width: "100%" }}>{["Spec", "Evidence", "Review", "Trace", "Handoff"].map((t, i) => <button key={t} className={i === 0 ? "is-on" : ""} style={{ flex: 1 }}>{t}</button>)}</div>
    <ContextDock compact />
    <div className="col gap2">
      <h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Requirements</h4>
      <div className="well" style={{ fontSize: ".76rem" }}>Goal and stop conditions captured</div>
      <div className="well" style={{ fontSize: ".76rem" }}>Workspace scope &amp; local-only constraint stated</div>
    </div>
    <Btn kind="primary" icon="link">Open in Trace &amp; Evidence</Btn>
  </>;
  return <Shell active="workbench" stage={["Spec", "Object editor"]} inspector={inspector}>
    <PageHead kicker="Object Editor" title="Workbench" sub="Navigate the SpecGraph outline and keep the inspector docked while you work."
      right={<Seg opts={["Board", "Mixed", "Flat"]} on="Mixed" />} />
    <div style={{ display: "grid", gridTemplateColumns: "240px minmax(0,1fr)", gap: 12, flex: 1, minHeight: 0 }}>
      <Panel title="Object outline" pad={false} className="col" style={{ overflow: "hidden" }}>
        <div className="col gap2" style={{ padding: 12, overflow: "auto" }}>
          {outline.map(([t, lvl, depth, sel]) => <button key={t} className="col" style={{ gap: 2, textAlign: "left", padding: "6px 8px", marginLeft: depth * 10, background: "var(--panel-strong)", border: "1px solid var(--line)", borderRadius: 5, boxShadow: sel ? "inset 3px 0 0 var(--accent)" : "none", borderColor: sel ? "color-mix(in srgb,var(--accent) 38%,#fff)" : "var(--line)" }}>
            <span style={{ color: "var(--text-dim)", font: "700 .62rem var(--font-ui)" }}>{lvl}</span>
            <strong style={{ fontSize: ".74rem", color: sel ? "var(--accent)" : "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t}</strong>
          </button>)}
        </div>
      </Panel>
      <div className="col gap3" style={{ minHeight: 0 }}>
        <Panel pad={false} className="grow" style={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
          <div className="canvas" style={{ position: "absolute", inset: 0, borderRadius: 8 }}>
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}><div className="canvas-toolbar"><IconBtn icon="minus" /><span className="zoomlevel">72%</span><IconBtn icon="plus" /><IconBtn icon="fit" /></div></div>
            <div className="zone" style={{ left: "5%", top: "12%", width: "88%", height: "70%" }}><span className="zone__lbl">Architecture modules</span></div>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }}>
              <path className="edge-validated" d="M180 150 C 280 150, 320 200, 420 200" fill="none" strokeWidth="1.8" />
              <path className="edge-pending" d="M180 160 C 300 240, 360 300, 470 320" fill="none" strokeWidth="1.8" />
            </svg>
            <WBNode d={NODES.context} abs selected style={{ left: "8%", top: "22%", transform: "scale(.9)", transformOrigin: "top left", zIndex: 2 }} />
            <WBNode d={NODES.spec} abs style={{ left: "46%", top: "22%", transform: "scale(.9)", transformOrigin: "top left", zIndex: 2 }} />
            <WBNode d={NODES.decision} abs style={{ left: "20%", top: "55%", transform: "scale(.9)", transformOrigin: "top left", zIndex: 2 }} />
            <WBNode d={NODES.handoff} abs style={{ left: "55%", top: "55%", transform: "scale(.9)", transformOrigin: "top left", zIndex: 2 }} />
          </div>
        </Panel>
        <Panel title="Readiness queue" pad={false}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,minmax(0,1fr))", gap: 8, padding: 12 }}>
            {[["Spec fields", "3", "wait"], ["Decisions", "1", "wait"], ["Evidence", "2", "wait"], ["Review", "2", "block"], ["Validation", "Wait", "active"]].map(([t, n, k]) =>
              <div key={t} className="well col gap2" style={{ minHeight: 78 }}><span className="muted" style={{ fontSize: ".72rem", fontWeight: 700 }}>{t}</span><Chip kind={k} noDot>{n}</Chip></div>)}
          </div>
        </Panel>
      </div>
    </div>
  </Shell>;
}

/* C — Readiness Lanes: reframes the board as swimlanes by readiness state, so the
   operator sees exactly what is blocking handoff. A focus inspector sits at right. */
function WorkbenchC() {
  const lanes = [["Ready", "ready", ["intake", "context"]], ["Needs lock / decision", "wait", ["spec", "decision"]],
    ["Needs evidence / sync", "active", ["trace", "preview"]], ["Blocked", "block", ["review", "handoff"]]];
  return <Shell active="workbench" stage={["Spec", "Readiness lanes"]}>
    <PageHead kicker="Readiness Lanes" title="Workbench" sub="Every SpecGraph object grouped by what stands between it and handoff."
      right={<Seg opts={["Board", "Mixed", "Lanes"]} on="Lanes" />} />
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 12, flex: 1, minHeight: 0 }}>
      {lanes.map(([title, kind, keys]) => <Panel key={title} pad={false} className="col" style={{ minHeight: 0 }}>
        <div className="row between" style={{ padding: "11px 12px", borderBottom: "1px solid var(--line)", borderTop: "3px solid var(--" + (kind === "ready" ? "green" : kind === "wait" ? "amber" : kind === "active" ? "cyan" : "red") + ")", borderRadius: "8px 8px 0 0" }}>
          <strong style={{ fontSize: ".82rem" }}>{title}</strong><Chip kind={kind} noDot>{keys.length}</Chip>
        </div>
        <div className="col gap3" style={{ padding: 12, overflow: "auto" }}>
          {keys.map(k => <WBNode key={k} d={NODES[k]} style={{ width: "100%" }} selected={k === "spec"} />)}
        </div>
      </Panel>)}
    </div>
  </Shell>;
}

Object.assign(window, { WorkbenchA, WorkbenchB, WorkbenchC });
