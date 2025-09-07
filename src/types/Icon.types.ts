export interface IconProps {
  height?: number;
  icon:
    | "arrowDown"
    | "delete"
    | "legend"
    | "menu"
    | "mock"
    | "newTab"
    | "placeholder"
    | "real"
    | "save"
    | "saved"
    | "success"
    | "upload";
  onClickFunction?: () => void;
  width?: number;
}
