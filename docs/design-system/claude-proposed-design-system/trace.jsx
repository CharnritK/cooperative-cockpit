/* global React, Shell, Chip, Btn, IconBtn, Icon, PageHead, CodeChip, Panel, Banner */
// trace.jsx — 2 layout approaches. Exports TraceA / TraceB.

const FLOW = [["Context Node", "Validated", "ready"], ["Spec Draft", "Needs lock", "wait"], ["Decision", "Needs lock", "wait"],
  ["Evidence", "Unavailable", "neutral"], ["Artifact Ref", "Needs sync", "active"], ["Work Packet", "Draft", "neutral"], ["Handoff Packet", "Unavailable", "block"]];
const EVID = [
  ["Source context evidence", "node-2", "spec-draft-primary", "Selected Context is visible on Workbench and excludes runtime state, secrets, and repo write authority.", "ready", "attached"],
  ["D-005 Decision evidence", "D-005", "handoff-preview", "Missing until Point locks D-005 for the handoff preview.", "block", "missing"],
  ["Validation readiness", "validation-local", "handoff-preview", "Readiness is waiting while spec fields, evidence review, or D-005 are unresolved.", "wait", "warning"],
  ["Handoff preview evidence", "handoff-preview", "handoff-preview", "Exists as local browser data only — not a produced handoff artifact.", "ready", "attached"],
];

function FlowChain() {
  return <div className="flow wrap">{FLOW.map(([t, s, k], i) => <React.Fragment key={t}>
    <div className="flow__step"><span className="t">{t}</span><Chip kind={k} noDot>{s}</Chip></div>
    {i < FLOW.length - 1 && <Icon n="chevron" s={16} className="flow__arrow" style={{ color: "var(--line-strong)", margin: "0 6px" }} />}
  </React.Fragment>)}</div>;
}

/* A — Trace chain (refined current): source-to-target chain banner, artifact
   references, then the evidence table. */
function TraceA() {
  return <Shell active="trace" stage={["Handoff", "Locks and evidence"]} stageBlocked>
    <PageHead gov kicker="Traceability" title="Trace &amp; Evidence" sub="Follow source-to-target links across context, spec fields, decisions, and artifact readiness." />
    <Banner kind="wait" icon="warn" >2 spec fields need trace evidence · 2 required evidence items still unavailable. Handoff readiness waits until these local checks clear.</Banner>
    <Panel style={{ overflowX: "auto" }}><FlowChain /></Panel>
    <Panel title="Artifact Reference" sub="Concrete references linked to Project, Spec Draft, Work Packet, and Handoff Packet objects.">
      <div className="col gap2" style={{ marginTop: 10 }}>
        <div className="well row between"><span className="mono" style={{ fontSize: ".74rem" }}>COCKPIT-MVP-014 local preview</span><Chip kind="active" noDot>Needs sync</Chip></div>
        <div className="well row between"><span className="mono" style={{ fontSize: ".74rem" }}>Handoff preview</span><Chip kind="handoff" noDot>Handoff only</Chip></div>
      </div>
    </Panel>
    <Panel pad={false} className="grow" style={{ minHeight: 0, overflow: "hidden" }}>
      <table className="tbl">
        <thead><tr><th>Evidence item</th><th>Source object</th><th>Target object</th><th>Summary</th><th style={{ width: 110 }}>Status</th></tr></thead>
        <tbody>{EVID.map(([item, src, tgt, sum, k, st]) => <tr key={item}>
          <td><strong>{item}</strong></td><td><span className="mono">{src}</span></td><td><span className="mono">{tgt}</span></td>
          <td className="muted">{sum}</td><td><Chip kind={k} noDot>{st}</Chip></td></tr>)}</tbody>
      </table>
    </Panel>
  </Shell>;
}

/* B — Evidence matrix: spec-field coverage map on the left (which fields have
   evidence), linked source→target detail on the right. Audit-first view. */
function TraceB() {
  const coverage = [["Objective", "ready", "source-context"], ["Layout regions", "ready", "source-context"], ["Interaction states", "wait", "validation-readiness"],
    ["Protected surfaces", "ready", "source-context"], ["Acceptance criteria", "block", "— none —"], ["Validation method", "wait", "validation-readiness"]];
  return <Shell active="trace" stage={["Handoff", "Evidence map"]} stageBlocked>
    <PageHead gov kicker="Traceability" title="Trace &amp; Evidence" sub="Audit every required spec field against its linked evidence before handoff." />
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.1fr)", gap: 12, flex: 1, minHeight: 0 }}>
      <Panel title="Spec field coverage" sub="4 of 6 fields have linked evidence" pad={false} className="col" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="col" style={{ overflow: "auto" }}>
          {coverage.map(([f, k, src]) => <div key={f} className="row between" style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div><strong style={{ fontSize: ".84rem" }}>{f}</strong><div className="mono dim" style={{ fontSize: ".68rem", marginTop: 2 }}>{src}</div></div>
            <Chip kind={k} noDot>{k === "ready" ? "Linked" : k === "block" ? "Missing" : "Warning"}</Chip></div>)}
        </div>
      </Panel>
      <Panel title="Evidence links" sub="Source → target with handoff requirement" pad={false} className="col" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="col gap3" style={{ padding: 14, overflow: "auto" }}>
          {EVID.map(([item, src, tgt, sum, k, st]) => <div key={item} className="well col gap2" style={{ borderLeft: "3px solid var(--" + (k === "ready" ? "green" : k === "block" ? "red" : "amber") + ")" }}>
            <div className="row between"><strong style={{ fontSize: ".82rem" }}>{item}</strong><Chip kind={k} noDot>{st}</Chip></div>
            <div className="row gap2" style={{ flexWrap: "wrap" }}><span className="mono code">{src}</span><Icon n="chevron" s={13} style={{ color: "var(--line-strong)" }} /><span className="mono code">{tgt}</span></div>
            <p className="muted" style={{ fontSize: ".74rem" }}>{sum}</p></div>)}
        </div>
      </Panel>
    </div>
  </Shell>;
}

Object.assign(window, { TraceA, TraceB });
