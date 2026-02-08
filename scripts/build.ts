import { writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

const folderIcons: Record<string, string[]> = {
  admin: ["admin", "admins", "manager", "managers", "moderator", "moderators", "moderation"],
  animation: ["animation", "animations", "anim", "anims", "animated"],
  assets: [],
  audio: ["audio", "audios", "sound", "sounds", "music", "aud", "auds"],
  auth: ["auth", "authentication", "auths", "authenticator", "authenticators", "security"],
  benchmark: ["benchmark", "benchmarks", "bench", "benches", "benchs", "performance", "measure", "measures", "measurement"],
  bin: ["binaries", "binary"],
  builder: ["builder", "builders", "factory", "factories", "constructor", "constructors"],
  camera: ["camera", "cameras", "viewmodel", "viewmodels", "lighting", "viewport", "viewports", "thumbnail", "thumbnails"],
  changesets: [".changesets"],
  client: ["client", "clients", "frontend", "frontends", "pwa", "app", "apps"],
  commands: ["commands", "command", "cli", "clis", "cmd", "cmds"],
  component: ["component", "components", "widget", "widgets", "fragments"],
  config: [
    "config", "cfg", "cfgs", "conf", "confs", ".config", "configs", "configuration",
    "configurations", "setting", ".setting", "settings", ".settings", "META-INF",
    "option", "options", "cypress", ".cypress", "debug", "debugging", ".devcontainer",
    ".direnv", ".docker", ".fastlane", ".firebase", ".forgejo", ".gitlab", ".gradle",
    ".husky", ".idea", ".kubernetes", ".k8s", ".next", ".renovate", ".turbo", ".vercel",
    ".now", ".wxt",
  ],
  connection: ["connection", "api", "apis", "connections", "integration", "integrations"],
  constant: ["constant", "constants", "const", "enum", "enums"],
  content: ["content", "contents", "storage"],
  context: ["context", "contexts"],
  coverage: ["coverage", "audit", "audits", ".nyc-output", ".nyc_output", "e2e", "it", "integration-test", "integration-tests", "__integration-test__", "__integration-tests__"],
  database: [
    "database", "databases", "db", "sql", "data", "_data", "datastore", "datastores",
    "save", "saves", "playerdata", "player-data",
  ],
  dist: ["bin", "bins", "dist", "dist-newstyle", "out", "build", "release", ".output"],
  docs: ["docs", "_post", "_posts", "doc", "document", "documents", "documentation", "post", "posts", "article", "articles"],
  effects: ["effects", "vfx", "particles"],
  error: ["error", "errors", "exception", "exceptions", "issue", "issues"],
  event: ["event", "events", "remote", "remotes"],
  fonts: ["fonts", "font", "typeface", "typefaces"],
  function: [
    "function", "functions", "func", "funcs", "lambda", "lambdas", "logic",
    "math", "maths", "calc", "calcs", "calculation", "calculations",
  ],
  github: ["github", ".github", ".git", "patches", "githooks", ".githooks", "submodules", ".submodules"],
  hooks: ["hooks", "hook", "composables", "composable"],
  image: [
    "asset", "assets", "image", "_images", "_image", "_imgs", "_img", "images",
    "imgs", "img", "icons", "icon", "icos", "ico", "figures", "figure", "figs",
    "fig", "screenshot", "screenshots", "screengrab", "screengrabs", "pic", "pics",
    "picture", "pictures", "photo", "photos", "photograph", "photographs",
  ],
  input: ["input", "inputs", "device", "devices", "sensor", "sensors"],
  javascript: ["javascript", "js", "cjs", "esm"],
  json: ["json", "schema", "schemas"],
  layout: ["layout", "layouts", "_layouts", "ui", "uis", "interface", "screen", "screens"],
  lib: ["lib", "libs", "library", "libraries"],
  luau: ["luau", "lute", ".lute", ".pesde"],
  lune: ["lune", ".lune"],
  marketing: ["marketing", "product", "products", "passes", "gamepasses", "game-passes"],
  middleware: ["middleware", "middlewares", "core", "system", "systems"],
  model: ["model", "models", "redux", "rodux", "reflex"],
  module: [
    "module", "modules", "node_modules", "mock", "mocks", "__mocks__", "fixture",
    "fixtures", "__fixtures__", "devpackages", "serverpackages", "vendor", "vendors",
    "plugin", "plugins", "_plugins", "lune_packages", "luau_packages", "mod", "mods",
    "modding", "extension", "extensions", "addon", "addons", "shared",
  ],
  node: [],
  nuxt: ["nuxt", ".nuxt"],
  package: ["package", "packages", ".cargo", "pkg", "pkgs", "crate", "crates"],
  page: ["page", "pages", "view", "views", "html", "public_html"],
  provider: ["provider", "providers"],
  roblox: ["roblox", "roblox_packages", "place", "places", "universe", "universes"],
  routes: ["routes", "route", "router", "routers", "routing"],
  script: ["script", "scripts", "scripting"],
  server: ["server", "servers", "backend"],
  service: [
    "service", "services", "controller", "controllers", "handler", "handlers",
    "actor", "actors", "workflow", "workflows",
  ],
  source: ["source", "sources", "src", "srcs", "code", "src-tauri"],
  storybook: ["storybook", ".storybook", "stories", "__stories__"],
  styles: [
    "styles", "sass", "_sass", "scss", "_scss", "css", "stylesheet", "stylesheets",
    "style", "theme", "themes", "palette", "palettes",
  ],
  svg: ["svg", "svgs"],
  temp: ["temp", ".temp", "tmp", ".tmp", "cached", "cache", ".cache"],
  template: ["template", "templates"],
  test: [
    "test", "tests", "testing", "__tests__", "__snapshots__", "__test__", "spec",
    "specs", "ci", ".ci", "testroot",
  ],
  types: ["types", "@types", "typings", "interfaces", "include", "includes", "typedefs", ".typedefs"],
  typescript: ["typescript", "ts", "tsx"],
  util: ["util", "utils", "utility", "utilities", "helper", "helpers"],
  video: ["video", "videos", "vid", "vids", "movie", "movies"],
  vscode: [".vscode", ".vscode-test"],
  web: [
    "web", "i18n", "internationalization", "lang", "langs", "language", "languages",
    "locale", "locales", "l10n", "localization", "translation", "translate",
    "translations", ".tx", "_site", "public", "www", "wwwroot", "website", "site",
    "browser", "browsers", "static",
  ],
  yarn: [".yarn"],
};

interface ThemeVariant {
  name: string;
  variant: string;
  appearance: "dark" | "light";
  outputFile: string;
}

const variants: ThemeVariant[] = [
  { name: "Base Charmed Icons", variant: "base", appearance: "dark", outputFile: "base-theme.json" },
  { name: "Light Charmed Icons", variant: "light", appearance: "light", outputFile: "light-theme.json" },
  { name: "Soft Charmed Icons", variant: "soft", appearance: "dark", outputFile: "soft-theme.json" },
  { name: "Warm Charmed Icons", variant: "warm", appearance: "dark", outputFile: "warm-theme.json" },
];

const baseTheme = JSON.parse(
  readFileSync(join(ROOT, "icon_themes", "_base-data.json"), "utf-8")
) as { file_stems: Record<string, string>; file_suffixes: Record<string, string>; file_icon_keys: string[] };

function buildNamedDirectoryIcons(variant: string): Record<string, { collapsed: string; expanded: string }> {
  const result: Record<string, { collapsed: string; expanded: string }> = {};

  for (const [key, names] of Object.entries(folderIcons)) {
    const collapsed = `./icons/${variant}/folder_${key}.svg`;
    const expanded = `./icons/${variant}/folder_${key}_open.svg`;

    for (const name of names) {
      result[name] = { collapsed, expanded };
    }
  }

  return result;
}

function buildFileIcons(variant: string): Record<string, { path: string }> {
  const result: Record<string, { path: string }> = {};
  result["default"] = { path: `./icons/${variant}/_file.svg` };
  for (const key of baseTheme.file_icon_keys) {
    result[key] = { path: `./icons/${variant}/${key}.svg` };
  }
  return result;
}

for (const { name, variant, appearance, outputFile } of variants) {
  const theme = {
    $schema: "https://zed.dev/schema/icon_themes/v0.2.0.json",
    name: "Charmed Icons+",
    author: "littensy",
    themes: [
      {
        name,
        appearance,
        directory_icons: {
          collapsed: `./icons/${variant}/_folder.svg`,
          expanded: `./icons/${variant}/_folder_open.svg`,
        },
        named_directory_icons: buildNamedDirectoryIcons(variant),
        file_stems: baseTheme.file_stems,
        file_suffixes: baseTheme.file_suffixes,
        file_icons: buildFileIcons(variant),
      },
    ],
  };

  const outPath = join(ROOT, "icon_themes", outputFile);
  writeFileSync(outPath, JSON.stringify(theme, null, 2) + "\n");
  console.log(`Wrote ${outputFile}`);
}
