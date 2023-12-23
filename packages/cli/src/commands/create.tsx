import { Box, Spacer, Text, useApp, useFocusManager } from "ink";
import React, { useEffect, useState } from "react";

import { Confirm } from "../components/Confirm.js";
import { Field } from "../components/Field.js";
import { useCursorMove } from "../hooks/use-cursor-move.js";
import { executeScaffdog } from "../utils/execute-scaffdog.js";

export default function Create() {
  const [actionName, setActionName] = useState("");
  const [actionDescription, setActionDescription] = useState("");

  const { exit } = useApp();
  const { focus, focusNext, focusPrevious } = useFocusManager();

  useCursorMove({
    onUp: focusPrevious,
    onDown: focusNext,
  });

  useEffect(() => {
    focus("1");
  }, []);

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
          await executeScaffdog({
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
