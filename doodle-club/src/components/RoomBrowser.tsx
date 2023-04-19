import { useState } from "react";
import { RoomType } from "../types/RoomType";
import { RoomListItem } from "./RoomListItem";

export function RoomBrowser() {
    const [rooms, setRooms] = useState(mockRooms);

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

const mockRooms: RoomType[] = [{
    _id: "1",
    name: "Jay's Room",
    passCode: "",
    adminId: "jay",
    occupancyMax: 10,
    teamMin: 2,
    teamMax: 2,
    teamMemberMin: 2,
    teamMemberMax: 10,
    teamAutoBalance: false
},
{
    _id: "2",
    name: "Sean's Room",
    passCode: "",
    adminId: "sean",
    occupancyMax: 10,
    teamMin: 2,
    teamMax: 2,
    teamMemberMin: 2,
    teamMemberMax: 10,
    teamAutoBalance: false
},
{
    _id: "3",
    name: "Jay's Locked Room",
    passCode: "jay",
    adminId: "jay",
    occupancyMax: 10,
    teamMin: 2,
    teamMax: 2,
    teamMemberMin: 2,
    teamMemberMax: 10,
    teamAutoBalance: false
},
{
    _id: "4",
    name: "Charley's Room",
    passCode: "",
    adminId: "charley",
    occupancyMax: 10,
    teamMin: 2,
    teamMax: 2,
    teamMemberMin: 2,
    teamMemberMax: 10,
    teamAutoBalance: false
}];