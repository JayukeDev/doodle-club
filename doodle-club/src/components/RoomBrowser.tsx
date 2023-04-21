import { FC } from "react";
import { RoomType } from "../types/RoomType";
import { RoomListItem } from "./RoomListItem";

export const RoomBrowser: FC<{ rooms: RoomType[], roomSelect(room: RoomType): void }> = ({ rooms, roomSelect }) => {

    const handleRoomSelect = (room: RoomType) => {
        roomSelect(room);
    };

    const displayRooms = () => {
        return rooms.map((room) => <div className={`RoomListItem ${room?.name}`} onClick={() => handleRoomSelect(room)}><RoomListItem room={room} /></div>);
    };

    return (
        <div className="RoomBrowser">
            <ol>
                {displayRooms()}
            </ol>
        </div>
    );
}