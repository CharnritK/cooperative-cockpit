import mockData from "../mock-data/openclaw.mock-data.v1.json";

const pendingDecision = mockData.decisions.find((decision) => decision.status === "pending_point_lock");
const lockedDecision = mockData.decisions.find((decision) => decision.status === "locked");

const stateLabels = {
  default: "Pending lock",
  dense: "Pending lock",
  empty: "No decision",
  loading: "Loading",
  warning: "Needs Point",
  error: "Missing evidence",
  disabled: "Disabled",
  selected: "Selected"
};

function createDecisionCard(args) {
  const frame = document.createElement("div");
  frame.className = "oc-story-frame";

  const card = document.createElement("article");
  card.className = "oc-decision-card";
  card.dataset.state = args.state;
  card.dataset.density = args.density;
  card.setAttribute("aria-labelledby", `${args.id}-title`);
  card.setAttribute("aria-describedby", `${args.id}-summary`);

  if (args.state === "loading") {
    card.setAttribute("aria-busy", "true");
  }

  const header = document.createElement("div");
  header.className = "oc-decision-card__header";

  const title = document.createElement("h3");
  title.id = `${args.id}-title`;
  title.className = "oc-decision-card__title";
  title.textContent = args.title;

  const badge = document.createElement("span");
  badge.className = "oc-decision-card__status";
  badge.textContent = stateLabels[args.state] || args.status;

  header.append(title, badge);
  card.append(header);

  const meta = document.createElement("p");
  meta.className = "oc-decision-card__meta";
  meta.textContent = `Decision ${args.id} · ${args.owner}`;
  card.append(meta);

  const summary = document.createElement("p");
  summary.id = `${args.id}-summary`;
  summary.className = args.state === "empty" ? "oc-decision-card__empty" : "oc-decision-card__summary";
  summary.textContent =
    args.state === "loading" ? "Decision evidence is loading from the local mock fixture." : args.rationale;
  card.append(summary);

  const actions = document.createElement("div");
  actions.className = "oc-decision-card__actions";

  const inspectButton = document.createElement("button");
  inspectButton.className = "oc-decision-card__button";
  inspectButton.type = "button";
  inspectButton.textContent = "Inspect decision";
  inspectButton.disabled = args.state === "disabled" || args.state === "loading" || args.state === "empty";

  const copyButton = document.createElement("button");
  copyButton.className = "oc-decision-card__button";
  copyButton.type = "button";
  copyButton.textContent = "Copy rationale";
  copyButton.disabled = args.state === "disabled" || args.state === "loading" || args.state === "empty";

  actions.append(inspectButton, copyButton);
  card.append(actions);
  frame.append(card);

  return frame;
}

const meta = {
  title: "Governance/DecisionCard",
  render: createDecisionCard,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "dense", "empty", "loading", "warning", "error", "disabled", "selected"]
    },
    density: {
      control: "select",
      options: ["comfortable", "dense"]
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "Docs-only Storybook example for the approved DecisionCard contract. It shows local governance state only and does not imply live approval, execution, or repository writes."
      }
    }
  }
};

export default meta;

export const Default = {
  args: {
    id: pendingDecision.id,
    title: pendingDecision.title,
    status: pendingDecision.status,
    owner: "Point",
    rationale: pendingDecision.rationale,
    state: "default",
    density: "comfortable"
  }
};

export const Dense = {
  args: {
    ...Default.args,
    id: "dec-dense",
    title: "Dense decision row",
    state: "dense",
    density: "dense"
  }
};

export const Empty = {
  args: {
    ...Default.args,
    id: "dec-empty",
    title: "No decision attached",
    rationale: "No Point-lock decision has been linked to this work packet yet.",
    state: "empty"
  }
};

export const Loading = {
  args: {
    ...Default.args,
    id: "dec-loading",
    title: "Decision loading",
    state: "loading"
  }
};

export const Warning = {
  args: {
    ...Default.args,
    id: "dec-warning",
    title: "Runtime token adoption",
    rationale: "Token candidates have evidence, but runtime adoption still requires Point/design-system approval.",
    state: "warning"
  }
};

export const Error = {
  args: {
    ...Default.args,
    id: "dec-error",
    title: "Missing approval evidence",
    rationale: "The decision cannot be treated as locked because no supporting evidence item is attached.",
    state: "error"
  }
};

export const Disabled = {
  args: {
    ...Default.args,
    id: "dec-disabled",
    title: "Decision unavailable",
    rationale: "Actions are disabled because this state is shown for documentation only.",
    state: "disabled"
  }
};

export const Selected = {
  args: {
    ...Default.args,
    id: lockedDecision.id,
    title: lockedDecision.title,
    status: lockedDecision.status,
    rationale: lockedDecision.rationale,
    state: "selected"
  }
};
