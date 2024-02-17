---
name: "generate"
root: "."
output: "."
---

# actions/{{ inputs.name | kebab }}/generate.ts

<!-- prettier-ignore -->
```ts
import { generate } from "@k-rf/action-builder";

import { action } from "{{ inputs.baseDir }}/action.meta";

generate(action, "{{ inputs.baseDir }}");

```
