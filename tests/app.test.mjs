import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";
import { URL, fileURLToPath } from "node:url";
import { APP_NAME, getGreeting } from "../dist/app.js";

const appPath = fileURLToPath(new URL("../dist/app.js", import.meta.url));

test("APP_NAME дорівнює DobroHub", () => {
  assert.equal(APP_NAME, "DobroHub");
});

test("getGreeting починається з назви застосунку", () => {
  assert.match(getGreeting(), /^DobroHub/);
});

test("smoke: dist/app.js запускається, друкує привітання і завершується", () => {
  const output = execFileSync(process.execPath, [appPath], { encoding: "utf8" });
  assert.match(output, /DobroHub/);
});
