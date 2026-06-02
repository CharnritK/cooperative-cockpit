/* global React, Shell, Chip, Btn, IconBtn, Seg, Icon, PageHead, CodeChip, Panel, Banner */
// spec-builder.jsx — 2 layout approaches. Exports SpecA / SpecB.

const FIELDS = [
  ["Objective", "Align context to a governed spec and gated handoff preview.", "draft", "Draft"],
  ["Layout regions", "Home summary, Workbench context, Spec fields, Decisions gate, Trace, Preview.", "draft", "Draft"],
  ["Interaction states", "Waiting on missing criteria, evidence, or open D-005 lock.", "draft", "Draft"],
  ["Protected surfaces", "Runtime state, Secrets, Repo write authority", "locked", "Locked"],
  ["Acceptance criteria", "", "missing", "Missing"],
  ["Validation method", "", "needs-lock", "Needs lock"],
];
const FCHIP = { draft: "neutral", locked: "ready", missing: "block", "needs-lock": "wait" };

/* A — Governed Readiness (refined current): readiness cards for the unresolved
   gate fields + a full field table with inline actions. */
function SpecA() {
  return <Shell active="spec" stage={["Spec", "Spec gates open"]} stageBlocked>
    <PageHead kicker="Spec Builder" title="Controlled Build Specification"
      sub="Choose a template, resolve fields, lock answers, and validate only when the required gates are clean."
      right={<><span className="field" style={{ minWidth: 180 }}><span className="field__lbl">Template</span><select className="select"><option>Product Spec</option><option>Review Brief</option><option>Codex Handoff</option></select></span></>} />
    <Panel title="Governed spec readiness" sub="Spec fields feed D-005 and the handoff preview. Missing acceptance criteria keeps readiness waiting." right={<Chip kind="block">2 unresolved</Chip>}>
      <div className="grid-3" style={{ marginTop: 12 }}>
        {[["Acceptance criteria", "Confirm the primary path, D-005 gate, evidence links, waiting state, and local-only preview.", "block", "1 open"],
          ["Validation method", "Use local validation suite plus manual workspace navigation and no-network checks.", "wait", "1 open"],
          ["D-005 gate", "Codex handoff gating checkpoint — Point lock required before readiness.", "wait", "1 open"]].map(([t, d, k, n]) =>
          <div key={t} className="well col gap2" style={{ borderColor: k === "block" ? "rgba(220,38,38,.3)" : "rgba(217,119,6,.35)" }}>
            <div className="row between"><strong style={{ fontSize: ".84rem" }}>{t}</strong><Chip kind={k} noDot>{n}</Chip></div>
            <p className="muted" style={{ fontSize: ".76rem" }}>{d}</p></div>)}
      </div>
    </Panel>
    <Banner kind="wait" icon="warn">Required fields still need answers before local validation can clear.</Banner>
    <Panel pad={false} className="grow" style={{ minHeight: 0, overflow: "hidden" }}>
      <table className="tbl">
        <thead><tr><th>Field</th><th>Value</th><th style={{ width: 120 }}>Status</th><th style={{ width: 170 }}>Actions</th></tr></thead>
        <tbody>
          <tr className="tbl__group"><td colSpan="4">Needs answer · 2 fields</td></tr>
          {FIELDS.filter(f => f[2] === "missing" || f[2] === "needs-lock").map(([n, v, s, l]) =>
            <tr key={n}><td><strong>{n}</strong></td><td className="muted">{v || <em className="dim">No answer yet — apply a suggestion or lock manually.</em>}</td>
              <td><Chip kind={FCHIP[s]}>{l}</Chip></td><td><div className="row gap2"><Btn sm>Suggest</Btn><Btn sm icon="lock">Lock</Btn></div></td></tr>)}
          <tr className="tbl__group"><td colSpan="4">Draft &amp; locked · 4 fields</td></tr>
          {FIELDS.filter(f => f[2] !== "missing" && f[2] !== "needs-lock").map(([n, v, s, l]) =>
            <tr key={n}><td><strong>{n}</strong></td><td className="muted">{v}</td>
              <td><Chip kind={FCHIP[s]}>{l}</Chip></td><td><div className="row gap2">{s === "locked" ? <Btn sm icon="check" disabled>Locked</Btn> : <><Btn sm>Suggest</Btn><Btn sm icon="lock">Lock</Btn></>}</div></td></tr>)}
        </tbody>
      </table>
      <div className="row between" style={{ padding: 12, borderTop: "1px solid var(--line)" }}>
        <Btn icon="review">Validate artifacts</Btn>
        <Btn icon="upload" disabled>Prepare handoff</Btn>
      </div>
    </Panel>
  </Shell>;
}

/* B — Split worksheet: field list rail on the left, focused field editor on the
   right with suggestion + evidence + gate impact. Faster single-field resolution. */
function SpecB() {
  const inspector = <>
    <div className="row between"><div className="panel__title" style={{ fontSize: "1rem" }}>Readiness</div><Chip kind="block">2 unresolved</Chip></div>
    <div className="rail-bar" style={{ margin: "2px 0 0" }}><i style={{ width: "67%" }} /></div>
    <div className="muted" style={{ fontSize: ".74rem" }}>4 of 6 fields drafted or locked</div>
    <div className="col gap2" style={{ paddingTop: 10, borderTop: "1px solid var(--line)" }}>
      <h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Gate impact</h4>
      <div className="well row between" style={{ fontSize: ".76rem" }}><span>D-005 handoff gate</span><Chip kind="wait" noDot>Waiting</Chip></div>
      <div className="well row between" style={{ fontSize: ".76rem" }}><span>Validation summary</span><Chip kind="active" noDot>2/2 local</Chip></div>
    </div>
    <Btn icon="review">Validate artifacts</Btn>
    <Btn kind="primary" icon="upload" disabled>Prepare handoff</Btn>
  </>;
  return <Shell active="spec" stage={["Spec", "Spec gates open"]} stageBlocked inspector={inspector}>
    <PageHead kicker="Spec Builder" title="Controlled Build Specification"
      sub="Resolve one field at a time. Locks feed D-005 and the handoff preview." />
    <div style={{ display: "grid", gridTemplateColumns: "300px minmax(0,1fr)", gap: 12, flex: 1, minHeight: 0 }}>
      <Panel title="Spec fields" pad={false} className="col" style={{ overflow: "hidden" }}>
        <div className="col gap2" style={{ padding: 12, overflow: "auto" }}>
          {FIELDS.map(([n, v, s, l], i) => <button key={n} className="row between" style={{ textAlign: "left", padding: "9px 10px", background: i === 4 ? "color-mix(in srgb,var(--accent) 7%,#fff)" : "var(--panel-strong)", border: "1px solid " + (i === 4 ? "color-mix(in srgb,var(--accent) 36%,#fff)" : "var(--line)"), borderRadius: 6, boxShadow: i === 4 ? "inset 3px 0 0 var(--accent)" : "none" }}>
            <strong style={{ fontSize: ".8rem", color: i === 4 ? "var(--accent)" : "var(--text-strong)" }}>{n}</strong><Chip kind={FCHIP[s]} noDot>{l}</Chip></button>)}
        </div>
      </Panel>
      <Panel className="col grow" style={{ minHeight: 0 }}>
        <div className="row between"><div><div className="phead__kicker">Field · required</div><div className="panel__title" style={{ fontSize: "1.15rem" }}>Acceptance criteria</div></div><Chip kind="block">Missing</Chip></div>
        <div className="field" style={{ marginTop: 14 }}><span className="field__lbl">Answer</span>
          <textarea className="input" style={{ minHeight: 110, resize: "none", fontFamily: "var(--font-ui)" }} placeholder="No answer yet. Confirm the primary path, D-005 gate, evidence links, waiting state, and local-only preview." /></div>
        <div className="well col gap2" style={{ marginTop: 12 }}>
          <div className="row gap2"><Icon n="spark" s={15} style={{ color: "var(--accent)" }} /><strong style={{ fontSize: ".78rem" }}>Suggestion</strong></div>
          <p className="muted" style={{ fontSize: ".78rem" }}>Confirm the primary path, D-005 gate, evidence links, waiting state, and local-only preview.</p>
          <div className="row gap2"><Btn sm icon="check">Apply suggestion</Btn><Btn sm>Dismiss</Btn></div>
        </div>
        <div className="row between mt-auto" style={{ paddingTop: 14 }}>
          <span className="muted mono" style={{ fontSize: ".7rem" }}>Evidence: none linked yet</span>
          <div className="row gap2"><Btn icon="link">Link evidence</Btn><Btn kind="primary" icon="lock">Lock field</Btn></div>
        </div>
      </Panel>
    </div>
  </Shell>;
}

Object.assign(window, { SpecA, SpecB });
