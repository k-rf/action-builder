---
name: "create"
root: "."
output: "."
---

# `actions/{{ inputs.name | kebab }}/action.meta.ts`

<!-- prettier-ignore -->
```ts
import { defineAction } from "@k-rf/action-builder";

export const action = defineAction
  .actionMeta({
    name: "{{ inputs.name | kebab }}",
    description: "{{ inputs.description }}",
  })
  .inputMeta((a) => ({
    // ここに入力の属性を定義してください。
    sample: a.string("サンプル"),
  }));

```

# `actions/{{ inputs.name | kebab }}/action.ts`

<!-- prettier-ignore -->
```ts
import * as core from "@actions/core";

const run = (): void => {
  try {
    core.info("Hello {{ inputs.name | kebab }}");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();

```
