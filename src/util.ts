import * as fs from "fs";
import { PackageJson } from "type-fest";

export const hasPackageJson = (s: string) =>
  fs
    .readdirSync(s, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .includes("package.json");

export const getDirectories = (s: string) =>
  fs
    .readdirSync(s, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

export const getPackageJson = (s: string) =>
  JSON.parse(fs.readFileSync(`${s}/package.json`).toString()) as Required<PackageJson>;

export const savePackageJson = (s: string, pj: string) => fs.writeFileSync(`${s}/package.json`, pj, "utf8");
