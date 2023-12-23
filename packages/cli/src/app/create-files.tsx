import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { loadScaffdog, Document, Scaffdog } from "scaffdog";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

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
  const scaffdog = await loadScaffdog(path.join(__dirname, "../.scaffdog"));
  const [document] = await getDocument(scaffdog);

  const files = await scaffdog.generate(
    document,
    path.join(dotGitPath, ".github"),
    {
      inputs: {
        name: name,
        description: description,
      },
    }
  );

  for (const file of files) {
    if (file.skip) continue;

    await fs.mkdir(path.dirname(file.path), { recursive: true });
    await fs.writeFile(file.path, file.content);
  }
};

/**
 * Scaffdog からドキュメントを取得する。
 *
 * NOTE
 * ----
 *
 * Scaffdog を実行するため、ドキュメントが 1 つ以上存在する必要がある。
 */
const getDocument = async (
  scaffdog: Scaffdog
): Promise<[Document, ...Document[]]> => {
  const documents = await scaffdog.list();

  if (documents.length === 0) {
    throw new Error("No documents found.");
  }

  return documents as [Document, ...Document[]];
};
