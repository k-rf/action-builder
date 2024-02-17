import { Spinner } from "@inkjs/ui";
import { Box, Text } from "ink";
import { useEffect, useState } from "react";

import { build } from "../app/build.js";

export default function Build() {
  const [isBuilding, setIsBuilding] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    build()
      .catch((e) => {
        setErrorMessage(e.errorMessage);
      })
      .finally(() => {
        setIsBuilding(false);
      });
  }, []);

  return isBuilding ? (
    <Box flexDirection="row">
      <Text>Building... </Text>
      <Spinner type="arrow3" />
    </Box>
  ) : errorMessage ? (
    <Text color="yellow">{errorMessage}</Text>
  ) : (
    <Text>Completed!</Text>
  );
}
