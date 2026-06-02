/* global React, Shell, Chip, Btn, IconBtn, Icon, PageHead, CodeChip, Panel, Banner */
// review-rules.jsx — Review Runs + Rules & Scope. Exports ReviewRuns / RulesScope.

const FINDINGS = [
  ["finding-spec-fields-open", "high", "Spec draft is waiting on acceptance criteria and validation method fields.", "Keep handoff readiness unavailable until required spec fields are locked locally.", "validation-readiness"],
  ["finding-d005-open", "high", "D-005 remains the visible Point-lock gate for handoff readiness.", "Keep D-005 in the Needs Point lock lane until the local decision is locked.", "locked-decision"],
  ["finding-evidence-warning", "medium", "Evidence review is incomplete for the handoff preview.", "Require local evidence review before enabling handoff readiness.", "source-context"],
];
const SEV = { high: ["block", "High severity"], medium: ["wait", "Medium severity"], low: ["active", "Low severity"] };

function ReviewRuns() {
  return <Shell active="review" stage={["Review", "Review evidence"]}>
    <PageHead kicker="Review Run object" title="Review Runs"
      sub="Inspect-only Review Run and Finding objects. They never execute code, mutate runtime state, or touch repositories."
      right={<Chip kind="ready">Review complete</Chip>} />
    <Panel title="Primary workflow review" sub="Scope: node-2, node-3, node-6, node-8 · Not ready for handoff until readiness checks clear">
      <Banner kind="wait" icon="warn" >Review Runs are advisory and inspect-only. Local acknowledge / defer controls update browser state only.</Banner>
    </Panel>
    <div className="col gap3 grow" style={{ minHeight: 0 }}>
      {FINDINGS.map(([id, sev, sum, rec, tag]) => {
        const [k, l] = SEV[sev];
        return <Panel key={id}>
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <div className="row gap2" style={{ alignItems: "center" }}><strong style={{ fontSize: ".95rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{id}</strong></div>
            <div className="row gap2"><Chip kind={k} noDot>{l}</Chip><Chip kind="block">Finding open</Chip></div>
          </div>
          <p style={{ fontSize: ".88rem", marginTop: 8 }}>{sum}</p>
          <p className="muted" style={{ fontSize: ".8rem", marginTop: 4 }}>{rec}</p>
          <div className="row between" style={{ marginTop: 12 }}>
            <span className="code">{tag}</span>
            <div className="row gap2"><Btn sm icon="check">Acknowledge locally</Btn><Btn sm>Defer locally</Btn></div>
          </div>
        </Panel>;
      })}
    </div>
  </Shell>;
}

const RULES = [
  ["Runtime mutation", false, "Unavailable by default", "Rules matrix"],
  ["Repo writes", false, "Handoff only", "Handoff gating"],
  ["Artifact drafting", true, "Spec builder allowed", "Spec Builder"],
  ["Dynamic UI", true, "Spec first", "Spec-first flow"],
  ["Secrets", false, "Excluded", "Protected exclusions"],
  ["External actions", false, "Unavailable", "Scope rules"],
  ["Review agents", true, "Inspect only", "Review Runs"],
  ["Codex handoff", true, "Gated until ready", "D-005"],
];

function RulesScope() {
  return <Shell active="rules" stage={["Handoff", "Locks and evidence"]} stageBlocked>
    <PageHead gov kicker="Governance" title="Rules &amp; Scope"
      sub="The safety model keeps runtime mutation, secrets, external actions, and repository writes outside this workspace." />
    <div className="grid-2">
      <Panel title="Allowed locally" style={{ borderColor: "rgba(22,163,74,.3)" }}>
        <div className="col gap2" style={{ marginTop: 8 }}>
          {RULES.filter(r => r[1]).map(([n, , gate]) => <div key={n} className="well row between"><span style={{ fontSize: ".8rem" }}>{n}</span><Chip kind="ready" noDot>{gate}</Chip></div>)}
        </div>
      </Panel>
      <Panel title="Blocked surfaces" style={{ borderColor: "rgba(220,38,38,.28)" }}>
        <div className="col gap2" style={{ marginTop: 8 }}>
          {RULES.filter(r => !r[1]).map(([n, , gate]) => <div key={n} className="well row between"><span style={{ fontSize: ".8rem" }}>{n}</span><Chip kind="block" noDot>{gate}</Chip></div>)}
        </div>
      </Panel>
    </div>
    <Panel pad={false} className="grow" style={{ minHeight: 0, overflow: "hidden" }}>
      <table className="tbl">
        <thead><tr><th>Rule</th><th style={{ width: 110 }}>Allowed?</th><th>Review gate</th><th style={{ width: 180 }}>Enforced at</th></tr></thead>
        <tbody>{RULES.map(([n, ok, gate, at]) => <tr key={n}>
          <td><strong>{n}</strong></td>
          <td><Chip kind={ok ? "ready" : "block"}>{ok ? "Yes" : "No"}</Chip></td>
          <td className="muted">{gate}</td>
          <td><span style={{ color: "var(--accent)", fontWeight: 650, fontSize: ".82rem" }}>{at}</span></td>
        </tr>)}</tbody>
      </table>
    </Panel>
  </Shell>;
}

Object.assign(window, { ReviewRuns, RulesScope });
