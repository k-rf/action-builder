import { throwError } from "@k-rf/action-builder-shared";
import { Document, Scaffdog } from "scaffdog";

/**
 * Scaffdog からドキュメントを取得する。
 *
 * NOTE
 * ----
 *
 * 自身で定義した .scaffdog を利用するため、 `name: create` と `name: generate` が存在することを前提としている。
 */
export const getScaffdogDocuments = async (
  scaffdog: Scaffdog
): Promise<Record<"create" | "generate", Document>> => {
  const documents = await scaffdog.list();

  if (documents.length === 0) {
    throw new Error("No documents found.");
  }

  return {
    create:
      documents.find((e) => e.name === "create") ??
      throwError("The `create` document is not found."),
    generate:
      documents.find((e) => e.name === "generate") ??
      throwError("The `generate` document is not found."),
  };
};
