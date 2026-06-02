/* global React, Shell, Chip, Btn, IconBtn, Seg, StatCard, Banner, Skel, Icon, PageHead, CodeChip, Panel */
// home.jsx — 3 layout approaches for Operator Home. Exports HomeA/B/C.

const READINESS_TOP = [
  ["Spec field missing: Acceptance criteria", "block"],
  ["Spec field missing: Validation method", "block"],
  ["Decision open: D-005", "wait"],
];
const OBJECT_STATE = [
  ["Selected Context seeded", "2 included", "ready"],
  ["Protected surfaces sealed", "3 excluded", "block"],
  ["Decision gate checked", "Waiting", "wait"],
  ["Validation summary", "2 / 2 clear", "accent"],
];

/* A — Readiness Command: refined current home. Clear readiness banner, scannable
   stat row, paired Work-Packet / object-state panels. */
function HomeA() {
  return <Shell active="home">
    <PageHead kicker="Project Overview" title="Cooperative Cockpit"
      sub="Governed context, spec, review, evidence, decision and handoff readiness — local data only."
      right={<Chip kind="neutral">Project object · Draft</Chip>} />

    <div className="panel" style={{ borderLeft: "3px solid var(--amber)" }}>
      <div className="panel--pad row between wrap" style={{ gap: 16 }}>
        <div style={{ maxWidth: 360 }}>
          <div className="phead__kicker" style={{ color: "var(--amber)" }}>Handoff readiness</div>
          <div style={{ font: "700 1.5rem/1 var(--font-display)", color: "var(--text-strong)", margin: "4px 0 6px" }}>11 open readiness items</div>
          <p className="muted" style={{ fontSize: ".84rem" }}>Resolve the top items before the local handoff preview can open.</p>
        </div>
        <div className="row wrap gap2" style={{ maxWidth: 470, justifyContent: "flex-end" }}>
          {READINESS_TOP.map(([t, k]) => <Chip key={t} kind={k} noDot>{t}</Chip>)}
          <Chip kind="neutral" noDot>+8 more</Chip>
        </div>
      </div>
    </div>

    <div className="grid-3">
      <StatCard icon="context" tone="active" label="Selected Context" num="2" sub="Goal Intake · Context Selector" />
      <StatCard icon="lock" tone="block" label="Protected exclusions" num="3" sub="Runtime · Secrets · Repo write" />
      <StatCard icon="decisions" tone="wait" label="Pending Decisions" num="1" sub="D-005 · Point lock required" />
    </div>

    <div className="grid-2 grow" style={{ minHeight: 0 }}>
      <Panel title="Packet preview" className="col">
        <div className="col gap3 grow">
          <div className="well row between"><span className="row gap2"><Icon n="spec" s={16} style={{ color: "var(--text-dim)" }} /><strong>Work Packet</strong></span><CodeChip>GOAL-007</CodeChip></div>
          <p className="muted" style={{ fontSize: ".82rem" }}>Surface Work Packet and derived Handoff Packet readiness in existing pages using local data only.</p>
          <div className="well row between"><span className="row gap2"><Icon n="upload" s={16} style={{ color: "var(--text-dim)" }} /><strong>Handoff Packet</strong></span><Chip kind="wait">11 open</Chip></div>
          <div className="grow" />
          <Btn kind="primary" icon="preview">Open Preview readiness</Btn>
        </div>
      </Panel>
      <Panel title="Recent object-model state" className="col">
        <div className="col grow">
          {OBJECT_STATE.map(([k, v, kind]) => <div key={k} className="row between" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
            <span className="muted">{k}</span><Chip kind={kind}>{v}</Chip></div>)}
          <div className="grow" />
          <Banner kind="info" icon="bolt">Next safe actions are local-only — no runtime, repo, or network calls.</Banner>
        </div>
      </Panel>
    </div>
  </Shell>;
}

/* B — Guided Next-Actions: first-run friendly. Readiness ring + ordered
   "do this next" checklist routing to the right screen. */
function HomeB() {
  const items = [
    ["1", "Add Acceptance criteria", "Spec Builder", "block", "Missing"],
    ["2", "Add Validation method", "Spec Builder", "block", "Needs lock"],
    ["3", "Point-lock decision D-005", "Decisions", "wait", "Needs lock"],
    ["4", "Attach D-005 evidence", "Trace & Evidence", "wait", "Missing"],
    ["5", "Sync local preview", "Preview", "active", "Needs sync"],
  ];
  return <Shell active="home">
    <PageHead kicker="Operator Home" title="What needs you next"
      sub="Five local steps stand between this project and a builder-ready handoff packet." />
    <div style={{ display: "grid", gridTemplateColumns: "256px minmax(0,1fr)", gap: 14, flex: 1, minHeight: 0 }}>
      <div className="col gap4">
        <Panel className="col" style={{ alignItems: "center", gap: 10 }}>
          <div style={{ width: 132, height: 132, borderRadius: "50%", background: "conic-gradient(var(--accent) 0 46%, #e7edf4 46% 100%)", display: "grid", placeItems: "center" }}>
            <div style={{ width: 98, height: 98, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", textAlign: "center" }}>
              <div><div style={{ font: "700 2rem/1 var(--font-display)", color: "var(--text-strong)" }}>46%</div><div className="muted" style={{ fontSize: ".72rem" }}>12 / 26 gates</div></div>
            </div>
          </div>
          <Chip kind="wait">Handoff blocked</Chip>
        </Panel>
        <Panel title="Work Packet">
          <div className="col gap2"><CodeChip>work-packet-primary</CodeChip>
            <div className="row between" style={{ marginTop: 6 }}><span className="muted" style={{ fontSize: ".82rem" }}>Handoff Packet</span><Chip kind="wait">11 open</Chip></div></div>
        </Panel>
      </div>
      <Panel pad={false} className="col" style={{ minHeight: 0 }}>
        <div className="row between" style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <div className="panel__title">Next safe actions</div><Chip kind="neutral">Local only</Chip>
        </div>
        {items.map(([n, t, where, kind, st]) => <div key={n} className="row between" style={{ padding: "13px 16px", borderBottom: "1px solid var(--line)", gap: 16 }}>
          <div className="row gap3">
            <div style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center", font: "700 .72rem var(--font-mono)", color: "var(--text-muted)", flex: "0 0 auto" }}>{n}</div>
            <div><div style={{ font: "650 .92rem var(--font-ui)", color: "var(--text-strong)" }}>{t}</div>
              <div className="muted" style={{ fontSize: ".8rem" }}>Resolve in <strong style={{ color: "var(--accent)" }}>{where}</strong></div></div>
          </div>
          <div className="row gap2"><Chip kind={kind}>{st}</Chip><Btn sm iconOnly icon="chevron" /></div>
        </div>)}
        <div style={{ padding: 16 }}><Banner kind="info" icon="bolt">Completing all five opens the local handoff preview for review.</Banner></div>
      </Panel>
    </div>
  </Shell>;
}

/* C — Stage Pipeline: emphasizes how screens connect. Stage rail across the top,
   then the single blocking focus + object state below. */
function HomeC() {
  const stages = [["Concept", "ready", "2/2"], ["Spec", "wait", "3/7"], ["Review", "wait", "1/4"], ["Preview", "active", "0/3"], ["Handoff", "block", "Locked"]];
  const blocking = [["Acceptance criteria", "Spec field missing", "block"], ["Validation method", "Spec field missing", "block"],
    ["D-005", "Decision open · Point lock", "wait"], ["Spec evidence", "Evidence missing", "wait"]];
  return <Shell active="home">
    <PageHead kicker="Project Overview" title="Cooperative Cockpit"
      sub="Track the project from concept intake to a governed builder handoff." right={<Chip kind="neutral">Draft</Chip>} />
    <Panel>
      <div className="flow between">
        {stages.map(([s, kind, c], i) => <React.Fragment key={s}>
          <div className="flow__step" style={{ flex: 1, background: i === 1 ? "color-mix(in srgb, var(--accent) 6%, #fff)" : "#fff" }}>
            <div className="t">{s}</div><Chip kind={kind}>{c}</Chip></div>
          {i < stages.length - 1 && <Icon n="chevron" s={16} style={{ color: "var(--line-strong)", margin: "0 4px" }} />}
        </React.Fragment>)}
      </div>
    </Panel>
    <div className="grid-2 grow" style={{ minHeight: 0 }}>
      <Panel title="Blocking handoff" right={<Chip kind="block">11 open</Chip>} className="col" style={{ borderLeft: "3px solid var(--red)" }}>
        <div className="col gap2 grow">
          {blocking.map(([t, d, k]) => <div key={t} className="well row between"><div><strong>{t}</strong><div className="muted mono" style={{ fontSize: ".68rem" }}>{d}</div></div><Chip kind={k}>open</Chip></div>)}
          <div className="grow" /><Btn kind="primary" icon="preview">Open Preview readiness</Btn>
        </div>
      </Panel>
      <Panel title="Object-model state" className="col">
        {OBJECT_STATE.concat([["Review run", "Advisory", "handoff"]]).map(([k, v, kind]) => <div key={k} className="row between" style={{ padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
          <span className="muted">{k}</span><Chip kind={kind}>{v}</Chip></div>)}
      </Panel>
    </div>
  </Shell>;
}

Object.assign(window, { HomeA, HomeB, HomeC });
