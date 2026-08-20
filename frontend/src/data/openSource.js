export const openSource = [
  {
    id: "opentelemetry",
    project: "OpenTelemetry",
    org: "CNCF",
    repo: "opentelemetry-go-compile-instrumentation",
    description:
      "Identified missing GenAI endpoint attributes and CI coverage gaps for database semantic conventions in the Go compile-time auto-instrumentation pipeline. Implemented and merged fixes adding telemetry coverage and multi-process end-to-end tests for HTTP-to-OpenAI context propagation.",
    prs: [
      {
        number: 992,
        url: "https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/992",
        title: "GenAI endpoint attributes fix",
      },
      {
        number: 1107,
        url: "https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/1107",
        title: "CI coverage for database semantic conventions",
      },
    ],
    tech: ["Go", "OpenTelemetry", "CI/CD"],
  },
  {
    id: "kubeedge-ianvs",
    project: "KubeEdge — Ianvs",
    org: "CNCF",
    repo: "ianvs",
    description:
      "Root-caused a critical ModuleNotFoundError and invalid configuration paths breaking the Cloud Robotics benchmark suite. Submitted fix restoring reliable execution of the semantic segmentation benchmark.",
    prs: [
      {
        number: 816,
        url: "https://github.com/kubeedge/ianvs/pull/816",
        title: "Fix ModuleNotFoundError and benchmark config paths",
      },
    ],
    tech: ["Python", "Kubernetes", "KubeEdge"],
  },
];

export const achievements = [
  {
    label: "LeetCode",
    value: "1600+ rating, 300+ problems",
    detail: "Consistent Medium/Hard DSA across graphs, DP & arrays",
  },
  {
    label: "CodeChef",
    value: "4-Star rating",
    detail: "Competitive programming",
  },
  {
    label: "WeMakeDev Global Hackathon",
    value: "Top 20 of 500+ teams",
    detail: "Meta & Cerebras sponsors; led backend architecture and system design",
  },
  {
    label: "AWS AI for Bharat Hackathon",
    value: "Semi-Finalist",
    detail: "Designed and built the AI-powered async backend end-to-end",
  },
  {
    label: "UIDAI Hackathon 2026",
    value: "Participant",
    detail:
      "Designed a clustering-based anomaly detection system for identifying inconsistencies in large-scale identity datasets",
  },
];
