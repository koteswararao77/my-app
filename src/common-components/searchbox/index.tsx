import { CSSProperties, ChangeEvent, forwardRef, ForwardedRef } from "react";
import { IoSearchSharp } from "react-icons/io5";
import classes from "./style.module.scss";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface SearchBoxProps {
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  classNameDiv?: string;
  style?: CSSProperties;
  onClick?: () => void;
  bNoRadius?: boolean;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      value,
      onChange,
      className = "",
      style = {},
      placeholder = "",
      onClick,
      bNoRadius,
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={`relative flex items-center overflow-hidden`}
        style={style}
      >
        <IoSearchSharp
          className="absolute color-primary"
          style={{ left: 15 }}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`text-sm color-sub-text border w-full ${
            classes.searchBoxInput
          } ${className} ${
            bNoRadius ? "" : "rounded-2xl"
          } focus:outline-none focus:border-green-500`}
          style={{ ...style }}
          onClick={onClick}
          ref={ref}
        />

        {value && (
          <IoMdCloseCircleOutline
            onClick={() => {
              const event = {
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>;
              onChange(event);
              if (ref && typeof ref !== "function" && ref?.current) {
                ref.current.focus();
              }
            }}
            className="absolute color-primary cursor-pointer w-10"
            style={{
              top: "32%",
              right: "1.5rem",
              fontSize: "1.2rem",
              color: "gray",
              cursor: "pointer",
            }}
          />
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";

export default SearchBox;
