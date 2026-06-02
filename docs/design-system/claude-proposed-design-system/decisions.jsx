/* global React, Shell, Chip, Btn, IconBtn, Seg, Icon, PageHead, CodeChip, Panel, Banner */
// decisions.jsx — 2 layout approaches. Exports DecisionsA / DecisionsB.

const DECISIONS = [
  ["D-001", "Selected Context placement", "Should the Selected Context panel be docked or floating?", ["Floating", "Docked", "Collapsible"], "Docked", "locked"],
  ["D-002", "Spec Builder access", "Tab only or dedicated page?", ["Tab", "Page", "Both"], "Both", "locked"],
  ["D-003", "Review action language", "What wording should be used for review actions?", ["Validate", "Start review checks"], "Validate", "locked"],
  ["D-004", "Preview naming", "Name of the preview tab / page.", ["Preview", "UI / HTML Viewer"], "Preview", "locked"],
];

function DecisionCard({ id, title, desc, options, chosen, locked, gate, focus }) {
  return <Panel className={"decision " + (locked ? "is-ready" : "is-wait")} style={focus ? { borderWidth: 1 } : {}}>
    <div className="row between" style={{ alignItems: "flex-start" }}>
      <div className="row gap3" style={{ alignItems: "flex-start" }}>
        <CodeChip>{id}</CodeChip>
        <div><strong style={{ fontSize: ".95rem" }}>{title}</strong><p className="muted" style={{ fontSize: ".8rem", marginTop: 3 }}>{desc}</p>
          {gate && <div className="mono dim" style={{ fontSize: ".68rem", marginTop: 4 }}>{gate}</div>}</div>
      </div>
      <Chip kind={locked ? "ready" : "wait"}>{locked ? "Locked" : "Needs lock"}</Chip>
    </div>
    <div className="row between wrap" style={{ marginTop: 12, gap: 10 }}>
      <div className="seg">{options.map(o => <button key={o} className={o === chosen ? "is-on tone-green" : ""}>{o}</button>)}</div>
      <div className="row gap2">
        {locked ? <><Btn sm icon="lock">Lock local decision</Btn><Btn sm icon="reset">Reset local lock</Btn></>
          : <><Btn sm kind="primary" icon="lock">Lock local decision</Btn></>}
        <Btn sm icon="link">Open trace</Btn>
      </div>
    </div>
  </Panel>;
}

/* A — Lock board (refined current): counts + filter, the D-005 governance callout,
   then Needs-lock and Locked groups. */
function DecisionsA() {
  return <Shell active="decisions" stage={["Handoff", "Locks and evidence"]} stageBlocked>
    <PageHead gov kicker="Point locks" title="Decisions" sub="Operational lock list for D-005 and related cockpit approval points."
      right={<Seg opts={["All", "Needs lock", "Locked"]} on="All" />} />
    <div className="row gap3">
      <Panel style={{ flex: 1 }}><div className="muted" style={{ fontSize: ".74rem" }}>Needs Point lock</div><div className="statcard__num">1</div></Panel>
      <Panel style={{ flex: 1 }}><div className="muted" style={{ fontSize: ".74rem" }}>Locked locally</div><div className="statcard__num">4</div></Panel>
    </div>
    <Panel className="decision is-wait" style={{ borderLeft: "4px solid var(--purple)" }}>
      <div className="row between"><div><div className="phead__kicker" style={{ color: "var(--purple)" }}>Governance checkpoint</div>
        <strong style={{ fontSize: "1.05rem" }}>D-005 · Codex handoff gating</strong></div><Chip kind="wait">Needs Point lock</Chip></div>
      <Banner kind="wait" icon="warn" >This decision only gates the handoff preview. It does not approve live work, repo changes, deployment, connectors, or runtime workflow.</Banner>
    </Panel>
    <div className="panel__title" style={{ fontSize: "1rem" }}>Needs Point lock <span className="muted" style={{ fontWeight: 400, fontSize: ".8rem" }}>· 1 item</span></div>
    <DecisionCard id="D-005" title="Codex handoff gating" desc="Governance checkpoint for when the Codex handoff preview can be marked ready."
      options={["Gated until ready", "Hold unavailable"]} chosen={null} locked={false} gate="Gates: handoff-preview · Point lock required before readiness" />
    <div className="panel__title" style={{ fontSize: "1rem", marginTop: 4 }}>Locked decisions <span className="muted" style={{ fontWeight: 400, fontSize: ".8rem" }}>· 4 items</span></div>
    {DECISIONS.map(([id, t, d, o, c, s]) => <DecisionCard key={id} id={id} title={t} desc={d} options={o} chosen={c} locked />)}
  </Shell>;
}

/* B — Focused approval: queue of decisions on the left, the Point-lock decision
   expanded on the right with gate mapping, evidence and a confident lock action. */
function DecisionsB() {
  return <Shell active="decisions" stage={["Handoff", "Point lock"]} stageBlocked>
    <PageHead gov kicker="Point locks" title="Decisions" sub="Resolve the open Point-lock decision with its full gate context in view." />
    <div style={{ display: "grid", gridTemplateColumns: "320px minmax(0,1fr)", gap: 12, flex: 1, minHeight: 0 }}>
      <Panel title="Decision queue" pad={false} className="col" style={{ overflow: "hidden" }}>
        <div className="col gap2" style={{ padding: 12, overflow: "auto" }}>
          {[["D-005", "Codex handoff gating", "wait", "Needs lock", true], ...DECISIONS.map(d => [d[0], d[1], "ready", "Locked", false])].map(([id, t, k, l, focus]) =>
            <button key={id} className="row between" style={{ textAlign: "left", padding: "10px", background: focus ? "color-mix(in srgb,var(--purple) 6%,#fff)" : "var(--panel-strong)", border: "1px solid " + (focus ? "color-mix(in srgb,var(--purple) 34%,#fff)" : "var(--line)"), borderRadius: 6, boxShadow: focus ? "inset 3px 0 0 var(--purple)" : "none" }}>
              <div className="row gap2"><CodeChip>{id}</CodeChip><strong style={{ fontSize: ".78rem" }}>{t}</strong></div><Chip kind={k} noDot>{l}</Chip></button>)}
        </div>
      </Panel>
      <Panel className="col grow" style={{ minHeight: 0, overflow: "auto", borderLeft: "4px solid var(--purple)" }}>
        <div className="row between"><div className="row gap3" style={{ alignItems: "flex-start" }}><CodeChip>D-005</CodeChip>
          <div><strong style={{ fontSize: "1.1rem" }}>Codex handoff gating</strong><p className="muted" style={{ fontSize: ".82rem", marginTop: 3 }}>Governance checkpoint for when the Codex handoff preview can be marked ready.</p></div></div>
          <Chip kind="wait">Needs Point lock</Chip></div>
        <Banner kind="wait" icon="warn" >Gates the handoff preview only — not live work, repos, deployment, or runtime.</Banner>
        <div className="field" style={{ marginTop: 4 }}><span className="field__lbl">Choose lock outcome</span>
          <div className="seg" style={{ width: "fit-content" }}><button className="is-on">Gated until ready</button><button>Hold unavailable</button></div></div>
        <div className="grid-2" style={{ marginTop: 4 }}>
          <div className="well col gap2"><h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Gate mapping</h4>
            <div className="row gap2"><CodeChip>handoff-preview</CodeChip><Chip kind="block" noDot>Locked until ready</Chip></div></div>
          <div className="well col gap2"><h4 style={{ font: "700 .76rem var(--font-ui)", color: "var(--text-strong)" }}>Linked evidence</h4>
            <div className="row between" style={{ fontSize: ".74rem" }}><span className="muted">D-005 Decision evidence</span><Chip kind="block" noDot>Missing</Chip></div>
            <div className="row between" style={{ fontSize: ".74rem" }}><span className="muted">Validation readiness</span><Chip kind="wait" noDot>Warning</Chip></div></div>
        </div>
        <div className="row between mt-auto" style={{ paddingTop: 14 }}>
          <Btn icon="link">Open trace</Btn>
          <div className="row gap2"><Btn>Defer locally</Btn><Btn kind="primary" icon="lock">Lock local decision</Btn></div>
        </div>
      </Panel>
    </div>
  </Shell>;
}

Object.assign(window, { DecisionsA, DecisionsB });
