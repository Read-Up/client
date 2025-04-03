import { color } from "./color";
import { zIndex } from "./zIndex";
import { typography } from "./typography";
export const theme = {
  color,
  zIndex,
  typography,
};

export type KeyOfTheme = keyof typeof theme;

export type TypeOfColor = typeof color;
export type KeyOfColor = keyof typeof color;

export type TypeOfZIndex = typeof zIndex;
export type KeyOfZIndex = keyof typeof zIndex;

export type TypeOfTypography = typeof typography;
export type KeyOfTypography = keyof typeof typography;
