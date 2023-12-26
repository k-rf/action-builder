---
name: "generate"
root: "."
output: "."
---

# actions/{{ inputs.name | kebab }}/generate.ts

<!-- prettier-ignore -->
```ts
/****************************
 * DO NOT MODIFY THIS FILE! *
 ****************************/

import { generate } from "@k-rf/action-builder";

import { action } from "./action.meta";

generate(action);

```
