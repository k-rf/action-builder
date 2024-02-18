import fs from "fs/promises";
import path from "path";

import { $ } from "zx";

import { checkPackages } from "../io/check-packages.js";
import { getDotGitHubPath } from "../io/get-dot-github-path.js";
import { scaffold } from "../io/scaffold.js";

export const build = async () => {
  const dotGitHubPath = await getDotGitHubPath();
  const actionDirs = await fs
    .readdir(path.join(dotGitHubPath, "actions"))
    .catch(() => {
      throw {
        exitCode: 1 as const,
        errorMessage: "No actions directory found in .github directory.",
      };
    });

  const noInstalledPackages = await checkPackages(["ts-node", "@vercel/ncc"]);
  if (noInstalledPackages.noInstalled.length > 0) {
    throw {
      exitCode: 2 as const,
      errorMessage: [
        "Please install following packages as devDependencies.",
        noInstalledPackages.noInstalled.map((e) => `"${e}"`).join(" "),
      ].join("\n"),
    };
  }

  const errorStatuses = await Promise.all(
    actionDirs.map(async (actionDir) => {
      const actionDirPath = path.join(dotGitHubPath, "actions", actionDir);

      const files = await scaffold(dotGitHubPath, {
        type: "generate",
        name: actionDir,
        baseDir: actionDirPath,
      });

      $.cwd = actionDirPath;
      await $`npx ts-node <<< ${files.map((file) => file.content)}`.quiet();

      $.cwd = ".";
      const res =
        await $`npx ncc build ${actionDirPath}/action.ts -o ${actionDirPath}/dist`
          .quiet()
          .catch((e) => e);

      return { exitCode: res.exitCode, actionName: actionDir };
    })
  );

  if (errorStatuses.some(({ exitCode }) => exitCode !== 0)) {
    throw {
      exitCode: 3 as const,
      errorMessage: [
        "Failed to build following actions.",
        errorStatuses
          .map((errorStatus) => `"${errorStatus.actionName}"`)
          .join(" "),
      ].join("\n"),
    };
  }
};
