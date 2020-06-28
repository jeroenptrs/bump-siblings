#!/usr/bin/env node
import * as path from "path";
import semver from "semver";

import { getDirectories, hasPackageJson, getPackageJson, savePackageJson } from "./util";

const packagesName = "packages";
const cwd = process.cwd();
const parentRepo = path.resolve(cwd, "../");
const dirName = cwd.substring(parentRepo.length + 1); // exclude "/"

if (hasPackageJson(cwd) && parentRepo.endsWith(`/${packagesName}`)) {
  const { name: cwdName, version: cwdVersion } = getPackageJson(cwd);

  // List all dirs with p.j
  const dirs = getDirectories(parentRepo)
    .filter((d: string) => d !== dirName)
    .map((d: string) => `${parentRepo}/${d}`)
    .filter(hasPackageJson);

  dirs.forEach((d: string) => {
    const pj = getPackageJson(d);

    if (!!pj.dependencies && !!pj.dependencies[cwdName] && semver.lt(pj.dependencies[cwdName], cwdVersion)) {
      const newPj = Object.assign({}, pj, { dependencies: { ...pj.dependencies, [cwdName]: cwdVersion } });

      savePackageJson(d, `${JSON.stringify(newPj, null, 2)}\n`);
    }
  });
}
