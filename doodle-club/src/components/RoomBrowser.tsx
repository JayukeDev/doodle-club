import { FC } from "react";
import { RoomType } from "../types/RoomType";
import { RoomListItem } from "./RoomListItem";

export const RoomBrowser: FC<{ rooms: RoomType[] }> = ({ rooms }) => {

    const displayRooms = () => {
        return rooms.map((room) => <RoomListItem room={room} />);
    }

    return (
        <div className="RoomBrowser">
            <ol>
                {displayRooms()}
            </ol>
        </div>
    );
}