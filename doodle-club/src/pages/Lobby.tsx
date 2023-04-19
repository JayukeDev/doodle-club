import { useState } from "react"
import { LobbyForm } from "../components/LobbyForm";

export function Lobby() {
    const [creatingLobby, setCreatingLobby] = useState(false);

    const createForm = (event: any) => {
        event.preventDefault();
        setCreatingLobby(true);
        console.log(creatingLobby);
    }

    // TODO: Hook to save form ~ somewhere ~

    return (
        <div className="Lobby">
            <button name="Create Lobby" onClick={createForm}>Create New Lobby</button>
            <hr />
            { creatingLobby && <LobbyForm /> }
        </div>
    );
}