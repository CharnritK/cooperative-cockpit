/* global React, Shell, Chip, Btn, IconBtn, Seg, Icon, PageHead, CodeChip, Panel, Banner */
// preview.jsx — 2 layout approaches for Preview / Handoff. Exports PreviewA / PreviewB.

const OPEN_ITEMS = [
  ["Spec field missing: Acceptance criteria", "block"],
  ["Spec field missing: Validation method", "block"],
  ["Decision open: D-005", "wait"],
  ["Evidence missing: Acceptance criteria", "wait"],
  ["Evidence missing: D-005 Decision", "wait"],
  ["Evidence missing: Validation readiness", "wait"],
];
const COVERAGE = [["Objective", "active"], ["Layout regions", "active"], ["Interaction states", "active"], ["Protected surfaces", "ready"], ["Acceptance criteria", "block"], ["Validation method", "block"]];

// striped artifact placeholder
function ArtifactFrame({ label }) {
  return <div style={{ position: "relative", borderRadius: 8, border: "1px solid var(--line)", overflow: "hidden", flex: 1, minHeight: 0,
    background: "repeating-linear-gradient(135deg, #f3f6fb 0 14px, #eaeef5 14px 28px)" }}>
    <div style={{ position: "absolute", inset: 18, border: "1.5px dashed var(--line-strong)", borderRadius: 6, display: "grid", placeItems: "center" }}>
      <div className="col gap2" style={{ alignItems: "center" }}><Icon n="layout" s={26} style={{ color: "var(--line-strong)" }} />
        <span className="mono" style={{ fontSize: ".72rem", color: "var(--text-dim)" }}>{label}</span></div>
    </div>
    <span className="mono" style={{ position: "absolute", left: 14, bottom: 12, fontSize: ".68rem", color: "var(--text-dim)" }}>UI Preview</span>
    <span className="mono" style={{ position: "absolute", right: 14, bottom: 12, fontSize: ".68rem", color: "var(--text-dim)" }}>Static local preview / COCKPIT-MVP-014</span>
  </div>;
}

/* A — Artifact Viewer (refined current): preview frame + spec coverage at left,
   readiness rail at right. */
function PreviewA() {
  return <Shell active="preview" stage={["Preview", "Preview sync"]}>
    <PageHead kicker="Preview" title="UI / HTML Viewer"
      sub="Inspect the artifact shell and compare visible coverage against the current specification state."
      right={<span className="field" style={{ minWidth: 170 }}><span className="field__lbl">Reference type</span><select className="select"><option>UI Preview</option><option>Handoff manifest</option></select></span>} />
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 12, flex: 1, minHeight: 0 }}>
      <div className="col gap3" style={{ minHeight: 0 }}>
        <Panel className="col grow" style={{ minHeight: 0 }}><ArtifactFrame label="UI Preview" /></Panel>
        <Panel title="Spec coverage" pad={false}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: 12 }}>
            {COVERAGE.map(([t, k]) => <div key={t} className="well row between" style={{ minHeight: 0, padding: "8px 10px" }}>
              <span className="muted" style={{ fontSize: ".76rem" }}>{t}</span><Chip kind={k} noDot>{k === "ready" ? "Gated" : k === "block" ? "Incomplete" : "Partial"}</Chip></div>)}
          </div>
        </Panel>
      </div>
      <Panel title="Readiness rail" className="col" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="row gap2" style={{ marginBottom: 4 }}><Chip kind="active">Needs sync</Chip><Chip kind="block">Gated locally</Chip></div>
        <div className="well" style={{ fontSize: ".76rem" }}><strong>Work Packet</strong><div className="muted" style={{ marginTop: 4 }}>Surface Work Packet and derived Handoff Packet readiness using local data only.</div></div>
        <h4 style={{ font: "700 .78rem var(--font-ui)", color: "var(--text-strong)", marginTop: 4 }}>Open readiness items</h4>
        <div className="col gap2" style={{ overflow: "auto", minHeight: 0 }}>
          {OPEN_ITEMS.map(([t, k]) => <div key={t} className="well row gap2" style={{ padding: "8px 10px", borderLeft: "3px solid var(--" + (k === "block" ? "red" : "amber") + ")" }}>
            <span style={{ fontSize: ".76rem" }}>{t}</span></div>)}
        </div>
        <Btn className="mt-auto" icon="review">Open Review Runs</Btn>
      </Panel>
    </div>
  </Shell>;
}

/* B — Handoff Packet manifest: the gated builder packet preview. Surfaces the gate,
   blocked-by list, allowed paths, and the readiness checklist for handoff confidence. */
function PreviewB() {
  const checklist = [["Spec validated", "block", "Incomplete"], ["Decisions locked", "wait", "D-005 open"], ["Evidence reviewed", "wait", "2 missing"], ["Review items acknowledged", "wait", "3 open"], ["Validation summary", "active", "2/2 local"]];
  const allowed = ["Local app screens & interaction state", "Schema & QA references", "Evidence notes", "Operational status note"];
  const blocked = ["Acceptance criteria missing", "D-005 needs Point lock", "Required evidence missing or unreviewed"];
  return <Shell active="preview" stage={["Handoff", "Packet preview"]} stageBlocked>
    <PageHead kicker="Handoff Packet" title="Builder Handoff Preview"
      sub="A local, read-only preview of the packet a builder would receive. Nothing is exported or written to a repo."
      right={<><Chip kind="block">Readiness blocked</Chip><Btn icon="upload" disabled>Prepare handoff</Btn></>} />
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 340px", gap: 12, flex: 1, minHeight: 0 }}>
      <Panel pad={false} className="col grow" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="row between" style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
          <div className="row gap2"><Icon n="archive" s={16} style={{ color: "var(--purple)" }} /><strong>OPENCLAW-HANDOFF-PREVIEW-001</strong></div>
          <Chip kind="handoff">mock-preview</Chip>
        </div>
        <div className="col gap3" style={{ padding: 14, overflow: "auto", minHeight: 0 }}>
          <div><div className="phead__kicker" style={{ color: "var(--purple)" }}>Objective</div><p style={{ fontSize: ".86rem" }}>Align selected context into a governed spec and a D-005-gated handoff preview.</p></div>
          <div className="well row between" style={{ borderLeft: "3px solid var(--amber)" }}>
            <div><div className="row gap2"><CodeChip>D-005</CodeChip><strong style={{ fontSize: ".84rem" }}>Codex handoff gating</strong></div>
              <p className="muted" style={{ fontSize: ".76rem", marginTop: 4 }}>Governance checkpoint before the handoff preview can be marked ready.</p></div>
            <Chip kind="wait" noDot>Needs lock</Chip></div>
          <div className="grid-2">
            <div className="col gap2"><h4 style={{ font: "700 .78rem var(--font-ui)", color: "var(--green)" }}>Allowed paths</h4>
              {allowed.map(a => <div key={a} className="well" style={{ fontSize: ".74rem", padding: "7px 9px" }}>{a}</div>)}</div>
            <div className="col gap2"><h4 style={{ font: "700 .78rem var(--font-ui)", color: "var(--red)" }}>Blocked by</h4>
              {blocked.map(a => <div key={a} className="well" style={{ fontSize: ".74rem", padding: "7px 9px", borderColor: "rgba(220,38,38,.25)" }}>{a}</div>)}</div>
          </div>
        </div>
      </Panel>
      <Panel title="Readiness checklist" className="col" style={{ minHeight: 0 }}>
        <div className="col gap2">
          {checklist.map(([t, k, n]) => <div key={t} className="well row between" style={{ padding: "9px 10px" }}>
            <span style={{ fontSize: ".78rem" }}>{t}</span><Chip kind={k} noDot>{n}</Chip></div>)}
        </div>
        <Banner kind="wait" icon="warn" >Prepare handoff stays disabled until every local check clears.</Banner>
        <Btn className="mt-auto" icon="review">Open Review Runs</Btn>
      </Panel>
    </div>
  </Shell>;
}

Object.assign(window, { PreviewA, PreviewB });
