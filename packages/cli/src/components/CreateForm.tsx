import { Box, Spacer, Text, useApp, useFocusManager } from "ink";
import { useEffect, useState } from "react";

import { createFiles } from "../app/create-files.js";
import { Confirm } from "../components/Confirm.js";
import { Field } from "../components/Field.js";

type CreateFormProps = {
  dotGitPath: string;
};

export const CreateForm = ({ dotGitPath }: CreateFormProps) => {
  const [actionName, setActionName] = useState("");
  const [actionDescription, setActionDescription] = useState("");

  const { exit } = useApp();
  const { focus, focusNext } = useFocusManager();

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
};
