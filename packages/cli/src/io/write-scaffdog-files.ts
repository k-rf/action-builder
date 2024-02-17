import fs from "fs/promises";
import path from "path";

import { File } from "scaffdog";

export const writeScaffdogFiles = async (files: File | File[]) => {
  for (const file of [files].flat()) {
    await fs.mkdir(path.dirname(file.path), { recursive: true });
    await fs.writeFile(file.path, file.content);
  }
};
