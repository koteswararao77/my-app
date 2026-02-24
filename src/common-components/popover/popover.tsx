import React, {
    CSSProperties,
    FC,
    ReactElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
    memo,
    useLayoutEffect,
} from "react";
import classes from "./style.module.scss";
import { createPortal } from "react-dom";
const Popover: FC<{
    element?: ReactElement;
    children: ReactNode;
    className?: string;
    maxHeight?: number;
    style?: CSSProperties;
    open: boolean;
    onClose?: () => void;
    displayPosition?: "bottom" | "right" | "left";
    strictPosition?: boolean;
    fullWidth?: boolean;
}> = ({
    element,
    children,
    className = "",
    style = {},
    open = false,
    onClose,
    displayPosition = "bottom",
    strictPosition = false,
    fullWidth = false,
}) => {
        const [windowWidth, windowHeight] = useRef([
            window.innerWidth,
            window.innerHeight,
        ]).current;
        const containerRef = useRef<HTMLSpanElement>(null);
        const popoverRef = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState({
            animation: "",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            bottom: 0,
        });
        const [popoverStyle, setPopOverStyle] = useState<any>({});
        const showLeftCenter = () => {
            if (containerRef.current !== null && popoverRef.current !== null) {
                const containerPosition = containerRef.current.getBoundingClientRect();
                const popoverPosition = popoverRef.current.getBoundingClientRect();
                let bottomSpace = windowHeight - containerPosition.bottom;
                if (bottomSpace < popoverPosition.height / 2) {
                    setPosition({
                        ...position,
                        animation: "sliderRightToLeft",
                        left: containerPosition.left - popoverPosition.width,
                        top: windowHeight - popoverPosition.height - 10,
                        width: containerPosition.width,
                    });
                } else {
                    setPosition({
                        ...position,
                        animation: "sliderRightToLeft",
                        left: containerPosition.left - popoverPosition.width,
                        top: containerPosition.top - popoverPosition.height / 2,
                        width: containerPosition.width,
                    });
                }
            }
        };
        const showRightCenter = () => {
            if (containerRef.current !== null && popoverRef.current !== null) {
                const containerPosition = containerRef.current.getBoundingClientRect();
                const popoverPosition = popoverRef.current.getBoundingClientRect();
                let bottomSpace = windowHeight - containerPosition.bottom;
                if (bottomSpace < popoverPosition.height / 2) {
                    //when there is no enough space in buttom
                    setPosition({
                        ...position,
                        animation: "sliderleftToRight",
                        left: containerPosition.right,
                        top: windowHeight - popoverPosition.height - 10,
                        width: containerPosition.width,
                    });
                } else {
                    setPosition({
                        ...position,
                        animation: "sliderleftToRight",
                        left: containerPosition.right,
                        top: containerPosition.top - popoverPosition.height / 2,
                        width: containerPosition.width,
                    });
                }
            }
        };
        const showBottomCenter = () => {
            if (containerRef.current !== null && popoverRef.current !== null) {
                const containerPosition = containerRef.current.getBoundingClientRect();
                const popoverPosition = popoverRef.current.getBoundingClientRect();
                let requiredSpace = popoverPosition.width / 2;
                let rightSpace = windowWidth - containerPosition.right;
                if (rightSpace < requiredSpace) {
                    setPosition({
                        ...position,
                        animation: "sliderDown",
                        left: windowWidth - popoverPosition.width - 10,
                        top: containerPosition.bottom,
                    });
                    return;
                }
                setPosition({
                    ...position,
                    animation: "sliderDown",
                    left:
                        containerPosition.left +
                        containerPosition.width / 2 -
                        popoverPosition.width / 2,
                    top: containerPosition.bottom,
                });
            }
        };
        const showTopCenter = () => {
            if (containerRef.current !== null && popoverRef.current !== null) {
                const containerPosition = containerRef.current.getBoundingClientRect();
                const popoverPosition = popoverRef.current.getBoundingClientRect();
                setPosition({
                    ...position,
                    animation: "sliderUp",
                    left:
                        containerPosition.left +
                        containerPosition.width / 2 -
                        popoverPosition.width / 2,
                    top: containerPosition.top - popoverPosition.height,
                });
            }
        };

        const [isPositioned, setIsPositioned] = useState(false);

        useLayoutEffect(() => {
            if (!open || !containerRef.current || !popoverRef.current) return;

            const containerPosition = containerRef.current.getBoundingClientRect();
            const popoverPosition = popoverRef.current.getBoundingClientRect();
            const bottomSpace = windowHeight - containerPosition.bottom;
            const rightSpace = windowWidth - containerPosition.right;

            if (displayPosition === "bottom") {
                if (strictPosition) {
                    showBottomCenter();
                } else if (fullWidth) {
                    setPopOverStyle({ width: containerPosition.width });
                    setPosition({
                        ...position,
                        animation: "sliderDown",
                        left: containerPosition.left,
                        top: containerPosition.bottom,
                    });
                } else if (bottomSpace > popoverPosition.height) {
                    showBottomCenter();
                } else {
                    showTopCenter();
                }
            } else if (displayPosition === "right") {
                showRightCenter();
            } else if (displayPosition === "left") {
                showLeftCenter();
            }

            setIsPositioned(true);
        }, [open]);

        return (
            <>
                {element
                    ? React.cloneElement(
                        element as React.ReactElement<any>,
                        { ref: containerRef }
                    )
                    : <span ref={containerRef} />
                }

                {open === true &&
                    createPortal(
                        <>
                            <div
                                ref={popoverRef}
                                className={`fixed shadow-md ${classes.popover} ${className}`}
                                data-open={open}
                                data-animation={position.animation}
                                style={{
                                    ...popoverStyle,
                                    ...style,
                                    top: position.top,
                                    left: position.left,
                                    visibility: isPositioned ? "visible" : "hidden",
                                }}
                            >
                                {children}
                            </div>
                            <div
                                className={classes.popoverOverlay}
                                data-open={open}
                                onClick={() => {
                                    typeof onClose === "function" && onClose();
                                }}
                            ></div>
                        </>,
                        document.body
                    )}
            </>
        );
    };
export default memo(Popover);
