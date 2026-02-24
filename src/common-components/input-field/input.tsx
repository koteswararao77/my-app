import { FC, ChangeEvent, FocusEvent, CSSProperties } from "react";
import classes from "./style.module.scss";

const Input: FC<{
  id?: string;
  name?: string;
  label?: string;
  palceholder?: string;
  type?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onCopy?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onCut?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  value?: string | number;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  allowNegativeNumber?: boolean;
  className?: string;
  icon?: { className?: string };
  disabled?: boolean;
  autoComplete?: string;
  fromSupplyTab?: boolean;
}> = ({
  id,
  name,
  onPaste,
  onCopy,
  onCut,
  label,
  palceholder,
  type,
  required,
  onChange,
  onFocus,
  onBlur,
  allowNegativeNumber,
  style,
  inputStyle = {},
  value,
  className,
  icon,
  disabled,
  autoComplete,
  fromSupplyTab,
}) => {
  return (
    <>
      <div className={classes.inputContainer} style={style}>
        {label !== "" && (
          <label className="fs-12 color-sub-text">
            {label}{" "}
            <span className="color-red">{required === true && "*"}</span>
          </label>
        )}
        <input
         id={id}
         name={name}
          type={type || "text"}
          className={`w-full px-3 py-1.5 font-medium mt-2 ${
            fromSupplyTab ? "" : "border"
          }`}
          style={inputStyle}
          placeholder={palceholder || ""}
          onWheel={(e) => (e.target as HTMLElement).blur()}
          autoComplete={autoComplete || ""}
          onChange={(e) => {
            if (!onChange) {
              return;
            }
            if (type === "number") {
              let regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
              if (allowNegativeNumber === true) {
                regexp = /^[-0-9]*(\.[0-9]{0,2})?$/;
              }
              if (regexp.test(e.target.value) == true) {
                onChange(e);
              } else {
                e.target.value = parseFloat(e.target.value).toFixed(2);
                onChange(e);
              }
            } else {
              onChange(e);
            }
          }}
          onPaste={onPaste}
          onCopy={onCopy}
          onCut={onCut}
          onFocus={onFocus}
          value={value}
          disabled={disabled}
        />
      </div>
    </>
  );
};
export default Input;
