import { IconProps } from "./Icon.types";

import { ACTIONS, ACTION_STATUS } from "../constants/actions";

export interface ButtonProps {
  idleIcon?: IconProps["icon"];
  label?: string;
  onClickFunction: () => void;
}

export type ActionKey = (typeof ACTIONS)[keyof typeof ACTIONS]; // "delete" | "save" | "upload"
export type ActionStatus = (typeof ACTION_STATUS)[keyof typeof ACTION_STATUS]; // "idle" | "success"
