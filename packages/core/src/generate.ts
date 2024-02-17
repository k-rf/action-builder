import * as fs from "node:fs/promises";

import { ActionMeta, ParsedActionMeta } from "./define-action/types";
import { TemplateProps, template } from "./templates";

/**
 * メタデータの情報をもとに、action.yaml を生成する
 */
export const generate = async (action: ParsedActionMeta, baseDir = ".") => {
  await createActionYaml(
    action.meta.action,
    action.meta.inputs.map((e) => {
      return {
        description: e.description,
        name: e.name,
        ...(e.default !== undefined && { default: String(e.default) }),
        required: Boolean(e.required) && !Boolean(e.default),
      };
    }),
    { baseDir: baseDir }
  );
};

/**
 * action.yaml を出力する
 */
const createActionYaml = async (
  actionMeta: ActionMeta,
  inputs: TemplateProps["inputs"],
  { baseDir }: { baseDir: string }
) => {
  await fs.writeFile(
    `${baseDir}/action.yaml`,
    template({
      name: actionMeta.name,
      description: actionMeta.description,
      ...(inputs && { inputs: inputs }),
    }),
    { encoding: "utf-8" }
  );
};
