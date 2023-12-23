import { useInput } from "ink";
import { noop } from "remeda";
import { match } from "ts-pattern";

type UseCursorMoveProps = {
  onLeft?: () => void;
  onDown?: () => void;
  onUp?: () => void;
  onRight?: () => void;
};

type UseCursorMoveOptions = {
  vimMode?: boolean;
};

export const useCursorMove = (
  { onLeft, onDown, onUp, onRight }: UseCursorMoveProps = {},
  { vimMode }: UseCursorMoveOptions = { vimMode: false }
) => {
  useInput((input, key) => {
    if (vimMode) {
      match(input)
        .with("h", () => onLeft?.())
        .with("j", () => onDown?.())
        .with("k", () => onUp?.())
        .with("l", () => onRight?.())
        .otherwise(noop);
    }

    match(key)
      .with({ leftArrow: true }, () => onLeft?.())
      .with({ downArrow: true }, () => onDown?.())
      .with({ upArrow: true }, () => onUp?.())
      .with({ rightArrow: true }, () => onRight?.())
      .otherwise(noop);
  });
};
