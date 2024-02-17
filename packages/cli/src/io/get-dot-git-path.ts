import { simpleGit } from "simple-git";

/**
 * @deprecated getDotGitHubPath を代わりに使用する。
 */
export const getDotGitPath = async () => {
  return await simpleGit().revparse("--show-toplevel");
};
