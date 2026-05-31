import mockData from "../mock-data/openclaw.mock-data.v1.json";

const evidence = mockData.evidenceItems[0];
const warningEvidence = mockData.evidenceItems.find((item) => item.status === "warning");

const stateLabels = {
  default: "Complete",
  dense: "Complete",
  empty: "No evidence",
  loading: "Loading",
  warning: "Warning",
  error: "Error",
  disabled: "Disabled"
};

function createEvidenceCard(args) {
  const frame = document.createElement("div");
  frame.className = "oc-story-frame";

  const card = document.createElement("article");
  card.className = "oc-evidence-card";
  card.dataset.state = args.state;
  card.dataset.density = args.density;
  card.setAttribute("aria-labelledby", `${args.id}-title`);
  card.setAttribute("aria-describedby", `${args.id}-summary`);

  if (args.state === "loading") {
    card.setAttribute("aria-busy", "true");
  }

  const header = document.createElement("div");
  header.className = "oc-evidence-card__header";

  const title = document.createElement("h3");
  title.id = `${args.id}-title`;
  title.className = "oc-evidence-card__title";
  title.textContent = args.title;

  const badge = document.createElement("span");
  badge.className = "oc-evidence-card__status";
  badge.textContent = stateLabels[args.state] || args.status;

  header.append(title, badge);
  card.append(header);

  const meta = document.createElement("p");
  meta.className = "oc-evidence-card__meta";
  meta.textContent = `${args.type} evidence · ${args.path}`;
  card.append(meta);

  if (args.state === "loading") {
    const skeleton = document.createElement("div");
    skeleton.className = "oc-evidence-card__skeleton";
    skeleton.setAttribute("aria-label", "Evidence details loading");
    skeleton.append(document.createElement("span"), document.createElement("span"));
    card.append(skeleton);
  } else {
    const summary = document.createElement("p");
    summary.id = `${args.id}-summary`;
    summary.className = args.state === "empty" ? "oc-evidence-card__empty" : "oc-evidence-card__summary";
    summary.textContent = args.summary;
    card.append(summary);
  }

  const actions = document.createElement("div");
  actions.className = "oc-evidence-card__actions";

  const inspectButton = document.createElement("button");
  inspectButton.className = "oc-evidence-card__button";
  inspectButton.type = "button";
  inspectButton.textContent = "Inspect evidence";
  inspectButton.disabled = args.state === "disabled" || args.state === "loading";

  const linkButton = document.createElement("button");
  linkButton.className = "oc-evidence-card__button";
  linkButton.type = "button";
  linkButton.textContent = "Copy path";
  linkButton.disabled = args.state === "disabled" || args.state === "empty" || args.state === "loading";

  actions.append(inspectButton, linkButton);
  card.append(actions);
  frame.append(card);

  return frame;
}

const meta = {
  title: "Evidence/EvidenceCard",
  render: createEvidenceCard,
  argTypes: {
    state: {
      control: "select",
      options: ["default", "dense", "empty", "loading", "warning", "error", "disabled"]
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
          "Docs-only Storybook example for the approved EvidenceCard contract. It uses the canonical Design OS mock fixture and does not import or mutate static MVP runtime code."
      }
    }
  }
};

export default meta;

export const Default = {
  args: {
    id: evidence.id,
    title: evidence.title,
    status: evidence.status,
    type: evidence.type,
    path: "artifacts/evidence/design-system/DS-003-validation.md",
    summary: evidence.summary,
    state: "default",
    density: "comfortable"
  }
};

export const Dense = {
  args: {
    ...Default.args,
    id: "ev-dense",
    title: "Dense evidence row",
    state: "dense",
    density: "dense"
  }
};

export const Empty = {
  args: {
    ...Default.args,
    id: "ev-empty",
    title: "No evidence attached",
    path: "pending",
    summary: "No matching evidence has been attached to this work packet yet.",
    state: "empty"
  }
};

export const Loading = {
  args: {
    ...Default.args,
    id: "ev-loading",
    title: "Evidence loading",
    summary: "Evidence details are loading from the local mock fixture.",
    state: "loading"
  }
};

export const Warning = {
  args: {
    ...Default.args,
    id: warningEvidence.id,
    title: warningEvidence.title,
    status: warningEvidence.status,
    type: warningEvidence.type,
    summary: warningEvidence.summary,
    state: "warning"
  }
};

export const Error = {
  args: {
    ...Default.args,
    id: "ev-error",
    title: "Evidence path unavailable",
    path: "artifacts/evidence/design-system/missing.md",
    summary: "The evidence reference is documented, but the artifact is not available in the current package.",
    state: "error"
  }
};

export const Disabled = {
  args: {
    ...Default.args,
    id: "ev-disabled",
    title: "Evidence locked for review",
    summary: "Actions are disabled until Point or QA releases this review gate.",
    state: "disabled"
  }
};
