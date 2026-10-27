const allowed = {
  users: [],
  organizations: [],
  publications: [],
  discovery: ["publications"],
  applications: ["publications", "notifications"],
  moderation: ["publications", "notifications"],
  safety: ["moderation", "notifications"],
  notifications: [],
  aggregation: ["publications"],
};

const moduleRules = Object.entries(allowed).map(([name, deps]) => ({
  name: `${name}-allowed-deps`,
  severity: "error",
  comment: `Модуль ${name} може залежати лише від: ${deps.length ? deps.join(", ") : "жодного модуля"} (spec, розділ 2).`,
  from: { path: `^src/modules/${name}/` },
  to: {
    path: "^src/modules/",
    pathNot: [`^src/modules/(${[name, ...deps].join("|")})/`],
  },
}));

module.exports = {
  forbidden: [
    {
      name: "no-circular",
      severity: "error",
      comment: "Циклічні залежності заборонені.",
      from: {},
      to: { circular: true },
    },
    {
      name: "only-via-module-index",
      severity: "error",
      comment: "Інший модуль можна імпортувати лише через його index.ts.",
      from: { path: "^src/modules/([^/]+)/" },
      to: {
        path: "^src/modules/([^/]+)/",
        pathNot: ["^src/modules/$1/", "^src/modules/[^/]+/index\\.ts$"],
      },
    },
    {
      name: "db-only-via-index",
      severity: "error",
      comment: "До шару db звертаються лише через src/db/index.ts (ADR-0003).",
      from: { path: "^src/", pathNot: "^src/db/" },
      to: { path: "^src/db/", pathNot: "^src/db/index\\.ts$" },
    },
    {
      name: "db-no-module-deps",
      severity: "error",
      comment: "Шар db не залежить від бізнес-модулів.",
      from: { path: "^src/db/" },
      to: { path: "^src/modules/" },
    },
    ...moduleRules,
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
  },
};
