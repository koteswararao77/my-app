import { CSSProperties, FC, ReactNode } from "react";
import classes from "./style.module.scss";
import closeIcn from "../../assets/images/close.svg";

type IpanelSlideProps = {
  children: ReactNode;
  direction?: "left_to_right" | "right_to_left" | "bottom_to_top";
  open?: boolean;
  style?: CSSProperties;
  btnStyle?: CSSProperties;
  onClose?: () => void;
  showCloseButton?: boolean;
  zIndex?: number;
};

const PanelSlider: FC<IpanelSlideProps> = ({
  children,
  direction = "right_to_left",
  open = false,
  style = {},
  btnStyle = {},
  onClose,
  showCloseButton,
  zIndex = 100,
}: IpanelSlideProps) => {
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className={`${classes.panesliderOverlay} ${open ? classes.open : ""}`}
          style={{ zIndex: zIndex - 1 }}
        ></div>
      )}
      <div
        className={
          open
            ? classes.panelSlide + " " + classes.open
            : classes.panelSlide + " " + classes.close
        }
        data-direction={direction}
        style={{ ...style, zIndex }}
      >
        {showCloseButton && (
          <img
            src={closeIcn}
            className="absolute right-6 top-6 cursor-pointer"
            onClick={onClose}
            alt=""
          />
        )}
        <span className="bg-gray h-[100%]">{children}</span>
      </div>
    </>
  );
};
export default PanelSlider;
