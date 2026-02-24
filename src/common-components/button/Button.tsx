import React, { FC, ReactNode, CSSProperties } from "react";
import classes from "./style.module.scss";

const Button: FC<{
  variant?:
    | "contained"
    | "outlined"
    | "transparent"
    | "red"
    | "primaryLight"
    | "danger"
    | "lightOrange"
    | "outlined-primary"
    | "lightRed"
    | "gray"
    | "oceanGreen"
    | "lightBlue";
  children?: ReactNode;
  onClick?: () => void;
  styles?: CSSProperties;
  className?: string;
  text?: string;
  disabled?: boolean;
  shape?: "box" | "round" | "";
  size?: "normal" | "small";
}> = ({
  variant = "contained",
  children,
  onClick,
  styles = {},
  className = "",
  text = "",
  disabled = false,
  shape = "box",
  size = "normal",
}) => {
  return (
    <button
      onClick={onClick && onClick}
      data-variant={variant}
      style={styles}
      disabled={disabled}
      data-shape={shape}
      data-size={size}
      className={`${classes.button} ${shape === "round" ? classes.round : ""} ${className} flex items-center justify-center`}
    >
      {children ? children : text}
    </button>
  );
};

export default Button;
