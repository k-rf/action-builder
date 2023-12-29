import { Spinner } from "@inkjs/ui";
import { Box, Text } from "ink";
import { useEffect, useState } from "react";

import { build } from "../app/build.js";

export default function Build() {
  const [isBuilding, setIsBuilding] = useState(true);

  useEffect(() => {
    build().then(() => {
      setIsBuilding(false);
    });
  }, []);

  return isBuilding ? (
    <Box flexDirection="row">
      <Text>Building... </Text>
      <Spinner type="arrow3" />
    </Box>
  ) : (
    <Text>Completed!</Text>
  );
}
