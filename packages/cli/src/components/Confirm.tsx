import { ConfirmInput } from "@inkjs/ui";
import { Box, Spacer, useFocus } from "ink";
import React from "react";
import { noop } from "remeda";

type ConfirmProps = {
  id: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => Promise<void> | void;
};

export const Confirm = ({ id, onConfirm, onCancel }: ConfirmProps) => {
  const { isFocused } = useFocus({ id: id });

  return (
    <Box
      width={12}
      height={3}
      flexDirection="row"
      alignSelf="center"
      borderStyle="round"
      borderColor={isFocused ? "green" : "white"}
    >
      <Spacer />
      <ConfirmInput
        onConfirm={isFocused ? onConfirm : noop}
        onCancel={isFocused ? onCancel : noop}
      />
      <Spacer />
    </Box>
  );
};
