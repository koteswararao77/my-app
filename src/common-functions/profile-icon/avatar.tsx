import React from "react";
import { Avatar } from "@mui/material";
interface UserAvatarProps {
  name: string;
}
const getRandomColor = (name: string): string => {
  const colors = [
    // "#16A02C",
    "#F09226",
    "#FF5733",
    "#33B5E5",
    "#AA66CC",
    "#99CC00",
    "#FFBB33",
    "#FF4444",
    "#B64F9B",
    "#8359DE",
    "#168EA0",
  ];
  const index = name?.charCodeAt(0) % colors.length;
  return colors[index];
};
const UserAvatar: React.FC<UserAvatarProps> = ({ name }) => {
  const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  const backgroundColor = getRandomColor(name);
  return (
    <Avatar
      sx={{ bgcolor: backgroundColor, width: 35, height: 35, fontSize: 18 }}
    >
      {firstLetter}
    </Avatar>
  );
};
export default UserAvatar;
