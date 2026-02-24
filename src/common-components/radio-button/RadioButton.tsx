import { CSSProperties, FC } from "react";
import classes from "./style.module.scss";
import { IoMdRadioButtonOff } from "react-icons/io";
import { IoMdRadioButtonOn } from "react-icons/io";

const RadioButton: FC<{
  data: Array<{ [key: string]: string | number }>;
  value: string | number;
  pointer: { label: string; value: string };
  displayType?: "horizontal" | "vertical";
  labelPositon?: "right" | "left";
  onChange: (value: string | number) => void;
  styles?: CSSProperties;
  className?: string;
}> = ({
  data = [],
  value = "",
  pointer = { label: "label", value: "value" },
  displayType = "horizontal",
  labelPositon = "right",
  onChange,
  styles = {},
  className,
}) => {
  return (
    <div
      className={`mt_8 ${classes.container}`}
      data-view={displayType}
      style={styles}
    >
      {data.map((item) => (
        <span
          key={`radio-${item[pointer.value]}`}
          className={`flex grow cursor-pointer br-10 px-[10px] py-[5px] items-center ${
            classes.radio
          } ${
            value === item[pointer.value] ? "border-primary" : ""
          } ${className}`}
          data-position={labelPositon}
          onClick={() => {
            onChange && onChange(item[pointer.value]);
          }}
        >
          {value === item[pointer.value] ? (
            <IoMdRadioButtonOn className={`${classes.active}`} />
          ) : (
            <IoMdRadioButtonOn className="color-sub-text" />
          )}
          <span
            className={`fs-12 ml-1  ${
              value === item[pointer.value] ? "color-primary" : "color-sub-text"
            }`}
          >
            {item[pointer.label]}
          </span>
        </span>
      ))}
    </div>
  );
};
export default RadioButton;
