import path from "path";

import { File, loadScaffdog } from "scaffdog";

import { __dirname } from "../utils/index.js";

import { getScaffdogDocuments } from "./get-scaffdog-documents.js";

type ScaffoldFn = {
  (
    outputPath: string,
    inputs: { type: "create"; name: string; description: string }
  ): Promise<File[]>;
  (
    outputPath: string,
    inputs: { type: "generate"; name: string; baseDir: string }
  ): Promise<File[]>;
};

export const scaffold: ScaffoldFn = async (outputPath, inputs) => {
  const scaffdog = await loadScaffdog(path.join(__dirname, "../.scaffdog"));
  const document = (await getScaffdogDocuments(scaffdog))[inputs.type];

  return scaffdog.generate(document, outputPath, { inputs: inputs });
};
