import * as fs from "fs/promises";
import path from "path";

import { $ } from "zx";

import { getDotGitHubPath } from "../io/get-dot-github-path.js";
import { scaffold } from "../io/scaffold.js";

export const build = async () => {
  const dotGitHubPath = await getDotGitHubPath();
  const actionDirs = await fs.readdir(path.join(dotGitHubPath, "actions"));

  await Promise.all(
    actionDirs.map(async (actionDir) => {
      const actionDirPath = path.join(dotGitHubPath, "actions", actionDir);

      const files = await scaffold(dotGitHubPath, {
        type: "generate",
        name: actionDir,
        baseDir: actionDirPath,
      });

      // TODO: Execute the ncc command to compile the `action.ts` file
      // $`npx ncc build ${actionDirPath}/action.ts -o ${actionDirPath}/dist`;

      $.cwd = actionDirPath;
      await $`npx ts-node <<< ${files.map((file) => file.content)}`.quiet();
    })
  );
};
