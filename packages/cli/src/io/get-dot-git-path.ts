import { simpleGit } from "simple-git";

export const getDotGitPath = async () => {
  return await simpleGit().revparse("--show-toplevel");
};
