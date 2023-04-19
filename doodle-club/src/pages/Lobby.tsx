import { useState } from "react"
import { RoomBrowser } from "../components/RoomBrowser";
import { RoomForm } from "../components/RoomForm";

export function Lobby() {
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [rooms, setRooms] = useState([]);

    const createForm = (event: any) => {
        event.preventDefault();
        setCreatingRoom(true);
        console.log(creatingRoom);
    }

    // TODO: Hook to save form ~ somewhere ~

    return (
        <div className="Lobby">
            <button name="Create Room" onClick={createForm}>Create New Room</button>
            <hr />
            { creatingRoom && <RoomForm /> }
            <RoomBrowser />
        </div>
    );
}