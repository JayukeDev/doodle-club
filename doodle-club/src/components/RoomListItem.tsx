import { Callout, Colors, Divider } from "@blueprintjs/core";
import { FC, useContext } from "react";
import { UserContext } from "../App";
import { GameSettings } from "../pages/Room";
import { RoomType } from "../types/RoomType";
import { ReactComponent as Diagonal } from "../assets/CSSDiagonal.svg";

export const RoomListItem: FC<{ room: RoomType }> = ({ room }) => {
    const user = useContext(UserContext);
    
    const capacity = () => {
        const occupancyMax = room?.occupancyMax;
        const occupancy = Math.floor(Math.random()*10);

        const capacityColor = {
            background: Colors.GREEN3
        }

        if(occupancy >= occupancyMax)
            capacityColor.background = Colors.RED1
        else if (occupancy >= occupancyMax / 2)
            capacityColor.background = Colors.GOLD3

        return <div className="RoomCapacity" style={capacityColor} top-attr={occupancy} bottom-attr={occupancyMax}>/</div>
    }
    return (
        <Callout title={room?.name}> Owner: {room?.adminId} <Divider /> {capacity()}<Divider /> {room?.passCode && "🔒"} {room?.adminId === user.user?._id && "⚙️"} </Callout>
    );
}