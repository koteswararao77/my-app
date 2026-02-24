import React, { FC } from "react";
const TitleValueWidget: FC<({
    title: string,
    value: string | number,
    classes?: string,
    valueWidget?: React.ReactElement,
    isRedColor?: boolean,
    isGreenColor?: boolean,
    isBlueColor?: boolean
})> = ({ title, value, classes, valueWidget, isRedColor, isGreenColor, isBlueColor }) => (
    <div className={`${classes}`}>
        <div className="fs-12 color-sub-text">{title}</div>
        {
            valueWidget == null && title?.length > 0
            &&
            <div className={`fs-14 break-words ${isRedColor ? 'color-red' : isGreenColor ? 'color-primary' : isBlueColor ? 'color-blue' :''}`}>{value ? value : '-'}</div>
        }
        {valueWidget}
    </div>
);

export default TitleValueWidget;
