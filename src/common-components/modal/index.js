import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  cloneElement,
  useEffect,
} from "react";
import closeIcn from "../../assets/images/close.svg";
import classes from "./style.module.scss";

const Modal = (
  {
    children,
    modalWidth = "100vw",
    width = "80vw",
    height = "",
    open = false,
    onClose,
    bRadius = "",
  },
  ref
) => {
  /** Required states & ref for popup */
  const [showModal, setShowModal] = useState();
  const modalRef = useRef(null);

  /** Function to close modal and animate close */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /** Hook to expose function to childrens */
  useImperativeHandle(
    ref,
    () => {
      return {
        openModal() {
          setShowModal(true);
        },
        closeModal() {
          handleCloseModal();
        },
      };
    },
    []
  );
  useEffect(() => {
    setShowModal(open);
  }, [open]);
  return (
    <div
      className={`${classes.modal} ${
        showModal === true ? classes.open : classes.close
      } ${bRadius}`}
      ref={modalRef}
      style={{ width: modalWidth }}
    >
      <div
        className={`${classes.container} bg-white shadow-md rounded relative`}
        style={{ width: width, height: height }}
      >
        <img
          src={closeIcn}
          className="absolute right-6 top-4 cursor-pointer"
          onClick={() => {
            setShowModal(false);
            typeof onClose === "function" && onClose();
          }}
        />
        {showModal && cloneElement(children, { close: handleCloseModal })}
      </div>
      {showModal === true && <div className={classes.overlay}></div>}
    </div>
  );
};

export default forwardRef(Modal);
