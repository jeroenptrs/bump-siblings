import { build } from "esbuild";
import shell from "shelljs";

(async function () {
  console.log("checking types");
  if (shell.exec("npx tsc --noEmit").code !== 0) {
    shell.exit(1);
  } else {
    console.log("removing current build files");
    shell.rm("-rf", "./bin");

    console.log("compiling ts files");
    await build({
      entryPoints: ["./src/index.ts"],
      outfile: "./bin/index.js",
      bundle: true,
      minify: true,
      platform: "node",
    });

    shell.exit(0);
  }
})();
