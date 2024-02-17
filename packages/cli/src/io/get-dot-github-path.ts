import path from "path";

import { simpleGit } from "simple-git";

export const getDotGitHubPath = async () => {
  return path.join(await simpleGit().revparse("--show-toplevel"), ".github");
};
