import { Spinner } from "@inkjs/ui";
import { Text, useApp, useFocusManager } from "ink";
import { useEffect, useState } from "react";

import { CreateForm } from "../components/CreateForm.js";
import { useCursorMove } from "../hooks/use-cursor-move.js";
import { getDotGitPath } from "../io/get-dot-git-path.js";

export default function Create() {
  const [dotGitPath, setDotGitPath] = useState<string | undefined>(undefined);

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { exit } = useApp();
  const { focusNext, focusPrevious } = useFocusManager();

  useCursorMove({
    onUp: focusPrevious,
    onDown: focusNext,
  });

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

  return <CreateForm dotGitPath={dotGitPath} />;
}
