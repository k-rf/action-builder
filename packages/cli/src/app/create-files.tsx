import path from "path";

import { scaffold } from "../io/scaffold.js";
import { writeScaffdogFiles } from "../io/write-scaffdog-files.js";

/**
 * Scaffdog を実行し、ひな形を出力する。
 *
 * NOTE
 * ----
 *
 * 出力先はカレントディレクトリには依存せず、親方向で最も近い `.git` と同階層の `.github` になる。
 */
export const createFiles = async ({
  dotGitPath,
  name,
  description,
}: {
  dotGitPath: string;
  name: string;
  description: string;
}) => {
  const files = await scaffold(path.join(dotGitPath, ".github"), {
    type: "create",
    name: name,
    description: description,
  });

  return writeScaffdogFiles(files.filter((file) => !file.skip));
};
