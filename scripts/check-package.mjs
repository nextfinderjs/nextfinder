// Validates the publishable package before it is released.
// Runs in CI and in the release workflow. No dependencies, Node >= 22.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgDir = join(root, "packages", "nextfinder");
const pkg = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));

const EXPECTED_REPO_URL = "git+https://github.com/nextfinderjs/nextfinder.git";
const ALLOWED_FILES = ["LICENSE", "README.md", "package.json"];
const FORBIDDEN_SCRIPTS = ["preinstall", "install", "postinstall", "prepare"];

const errors = [];
const expect = (condition, message) => {
  if (!condition) errors.push(message);
};

expect(pkg.name === "nextfinder", `name must be "nextfinder", got "${pkg.name}"`);
expect(
  /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/.test(pkg.version ?? ""),
  `version must be valid semver, got "${pkg.version}"`,
);
expect(pkg.license === "MIT", `license must be "MIT", got "${pkg.license}"`);
expect(pkg.private !== true, `"private": true would block publishing`);
expect(
  pkg.repository?.url === EXPECTED_REPO_URL,
  `repository.url must be "${EXPECTED_REPO_URL}" (must match the GitHub repo for provenance), got "${pkg.repository?.url}"`,
);
expect(pkg.publishConfig?.access === "public", `publishConfig.access must be "public"`);
for (const name of FORBIDDEN_SCRIPTS) {
  expect(!pkg.scripts?.[name], `lifecycle script "${name}" is not allowed in a published package`);
}

let packed = [];
try {
  const out = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: pkgDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
const result = JSON.parse(out);
const entry = Array.isArray(result)
  ? result[0]
  : result.nextfinder ?? Object.values(result)[0];

if (!entry || !Array.isArray(entry.files)) {
  throw new Error("Unexpected npm pack --json output format");
}

packed = entry.files.map((f) => f.path).sort();
} catch (error) {
  errors.push(`npm pack --dry-run failed: ${error.message}`);
}
expect(
  JSON.stringify(packed) === JSON.stringify(ALLOWED_FILES),
  `tarball must contain exactly [${ALLOWED_FILES.join(", ")}], got [${packed.join(", ")}]`,
);

if (errors.length > 0) {
  console.error("Package check failed:");
  for (const message of errors) console.error(`  - ${message}`);
  process.exit(1);
}
console.log(`OK: ${pkg.name}@${pkg.version} (${packed.join(", ")})`);
