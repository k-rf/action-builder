import { Spinner } from "@inkjs/ui";
import { Box, Spacer, Text, useApp, useFocusManager } from "ink";
import React, { useEffect, useState } from "react";

import { createFiles } from "../app/create-files.js";
import { Confirm } from "../components/Confirm.js";
import { Field } from "../components/Field.js";
import { useCursorMove } from "../hooks/use-cursor-move.js";
import { getDotGitPath } from "../io/get-dot-git-path.js";

export default function Create() {
  const [actionName, setActionName] = useState("");
  const [actionDescription, setActionDescription] = useState("");
  const [dotGitPath, setDotGitPath] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { exit } = useApp();
  const { focus, focusNext, focusPrevious } = useFocusManager();

  useCursorMove({
    onUp: focusPrevious,
    onDown: focusNext,
  });

  useEffect(() => {
    focus("1");
  }, [dotGitPath]);

  useEffect(() => {
    getDotGitPath()
      .then((dotGitPath) => {
        setDotGitPath(dotGitPath);
      })
      .catch(() => {
        setErrorMessage("Failed to find the root of the git repository.");
        exit();
      });
  }, []);

  if (errorMessage) {
    return <Text color="red">{errorMessage}</Text>;
  }

  if (!dotGitPath) {
    return <Spinner />;
  }

  // TODO: 別コンポーネントとして切り出す。
  return (
    <Box flexDirection="column" width={80}>
      <Box
        height={5}
        borderStyle={"bold"}
        borderColor={"yellowBright"}
        alignItems="center"
      >
        <Spacer />
        <Text>Create a new custom action.</Text>
        <Spacer />
      </Box>
      <Field
        id="1"
        label="Action name"
        placeholder="Enter action name..."
        value={actionName}
        onChange={setActionName}
        onSubmit={focusNext}
      />
      <Field
        id="2"
        label="Action description"
        placeholder="Enter action description..."
        value={actionDescription}
        onChange={setActionDescription}
        onSubmit={focusNext}
      />
      <Confirm
        id="3"
        onConfirm={async () => {
          await createFiles({
            dotGitPath: dotGitPath,
            name: actionName,
            description: actionDescription,
          });

          exit();
        }}
        onCancel={exit}
      />
    </Box>
  );
}
