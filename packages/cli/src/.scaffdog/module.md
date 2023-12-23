---
name: "action-builder"
root: "."
output: "."
---

# `actions/{{ inputs.name | kebab }}/action.meta.ts`

```ts
import { defineAction } from "@k-rf/action-builder";

export const action = defineAction
  .actionMeta({
    name: "{{ inputs.name | kebab }}",
    description: "{{ inputs.description }}",
  })
  .inputs((a) => ({
    // ここに入力の属性を定義してください。
    sample: a.string("サンプル"),
  }));
```

# `actions/{{ inputs.name | kebab }}/action.ts`

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
