import { TextInput } from "@inkjs/ui";
import { Box, Text, useFocus } from "ink";

type FieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onSubmit?: (value: string) => Promise<void> | void;
  onChange?: (value: string) => Promise<void> | void;
};

export const Field = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  onSubmit,
}: FieldProps) => {
  const { isFocused } = useFocus({ id: id });

  return (
    <Box alignItems="center">
      <Box width={26}>
        <Text>{label}</Text>
      </Box>
      <Box
        borderStyle={"round"}
        borderColor={isFocused ? "blue" : "white"}
        paddingX={1}
        width={"100%"}
      >
        {isFocused ? (
          <TextInput
            placeholder={placeholder}
            defaultValue={value}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        ) : (
          <Box height={1}>
            {value ? (
              <Text>{value}</Text>
            ) : (
              <Text color={"black"}>{placeholder}</Text>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
