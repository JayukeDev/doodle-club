import { FC, useContext } from "react";
import { UserContext } from "../App";
import { RoomType } from "../types/RoomType";

export const RoomListItem: FC<{room: RoomType}> = ({ room }) => {
    const user = useContext(UserContext);
    return (
        <li>Name: {room.name} | Owner: {room.adminId} | Players: 0/{room.occupancyMax} | {room.passCode && "🔒" } | {room.adminId === user.user?._id && "⚙️" } </li>
    );
}