export const openSource = [
  {
    id: "opentelemetry",
    project: "opentelemetry-go-compile-instrumentation",
    org: "CNCF Incubating",
    repo: "opentelemetry-go-compile-instrumentation",
    description:
      "Contributed via the Linux Foundation LFX Mentorship Program. Shipped pull requests with test coverage and passing CI on production observability tooling for distributed systems — adding GenAI client instrumentation, telemetry coverage, and multi-process propagation tests.",
    prs: [
      {
        number: 992,
        url: "https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/992",
        title: "GenAI endpoint attributes & client instrumentation",
      },
      {
        number: 1107,
        url: "https://github.com/open-telemetry/opentelemetry-go-compile-instrumentation/pull/1107",
        title: "CI coverage & multi-process propagation tests",
      },
    ],
    tech: ["Go", "OpenTelemetry", "CI/CD", "Distributed Tracing"],
  },
  {
    id: "kubeedge-ianvs",
    project: "KubeEdge Ianvs",
    org: "CNCF Sandbox",
    repo: "ianvs",
    description:
      "Diagnosed and fixed a subprocess byte-output decoding/parsing bug causing intermittent failures in the interoperability test suite by tracing root cause through Python system internals. Validated via local testing and maintainer review.",
    prs: [
      {
        number: 816,
        url: "https://github.com/kubeedge/ianvs/pull/816",
        title: "Fix subprocess byte-output decoding in test suite",
      },
    ],
    tech: ["Python", "Kubernetes", "KubeEdge", "Edge AI"],
  },
];

export const achievements = [
  {
    label: "WeMakeDev Global Hackathon",
    value: "Top 20 of 500+ Teams",
    detail: "Sponsored by Meta & Cerebras — led backend architecture and system design",
  },
  {
    label: "AWS AI for Bharat Hackathon",
    value: "Semi-Finalist",
    detail: "Team lead for AI-powered asynchronous backend architecture",
  },
  {
    label: "LeetCode Contest Rating",
    value: "1550+ Rating, 300+ Solved",
    detail: "Consistent problem solving across DP, graphs, trees, and system design",
  },
  {
    label: "CodeChef",
    value: "4-Star Rating",
    detail: "Ranked among active competitive programming participants",
  },
];
