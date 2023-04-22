import { Card, Colors, Elevation } from "@blueprintjs/core";
import { FC } from "react";
import { RoomType } from "../types/RoomType";
import { RoomListItem } from "./RoomListItem";

export const RoomBrowser: FC<{ rooms: RoomType[], roomSelect(room: RoomType): void }> = ({ rooms, roomSelect }) => {

    const cardStyle = {
        color: Colors.LIGHT_GRAY3,
        background: Colors.DARK_GRAY5
    }
    
    const handleRoomSelect = (room: RoomType) => {
        roomSelect(room);
    };

    const displayRooms = () => {
        return rooms.map((room) => 
        <Card  className={`RoomListItem ${room?.name}`} elevation={Elevation.ONE} style={cardStyle} interactive={true} onClick={() => handleRoomSelect(room)}>
            <RoomListItem room={room} />
        </Card>
        );
    };
    return (
        <div className="RoomBrowser">
            <ul>
                {displayRooms()}
            </ul>
        </div>
    );
}