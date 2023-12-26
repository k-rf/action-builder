import * as fs from "fs/promises";
import path from "path";

import { Text } from "ink";
import { useEffect } from "react";

import { getDotGitHubPath } from "../io/get-dot-github-path.js";

export default function Generate() {
  useEffect(() => {
    // TODO:
    // 1. Get the path to the .github directory
    // 2. Create the `generate.ts` file to the .github directory
    // 3. Execute the ncc command to compile the `action.ts` file
    // 4. Execute the `generate.ts` file using `zx`
    // 5. Delete the `generate.ts` file

    getDotGitHubPath().then(async (dotGitHubPath) => {
      const actionDirs = await fs.readdir(path.join(dotGitHubPath, "actions"));
      actionDirs.map(async (_action) => {});
    });
  }, []);

  return <Text>Generate</Text>;
}
