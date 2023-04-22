import { Button } from "@blueprintjs/core";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Success } from "../App";
import { Modal, ModalConfig, ModalSize, Result } from "../components/Modal";
import { RoomBrowser } from "../components/RoomBrowser";
import { RoomSettings } from "../components/RoomSettings";
import { RoomType } from "../types/RoomType";
import { Room } from "./Room";

export const Lobby: FC = () => {
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [rooms, setRooms] = useState(mockRooms);
    const [selectedRoom, setSelectedRoom] = useState<RoomType>();

    const navigate = useNavigate();

    const createForm = (event: any) => {
        event.preventDefault();
        setCreatingRoom(true);
        console.log(creatingRoom);
    }

    // TODO: Hook to save form ~ somewhere ~
    const createRoom = (room: RoomType): Result => {
        console.log(room);
        // Create Room Hook
        setRooms([
            ...rooms,
            room
        ]);

        setCreatingRoom(false);

        return Success;
    }

    const createRoomCancel = (): Result => {
        setCreatingRoom(false);
        return Success;
    }

    const handleRoomSelect = (room: RoomType): Result => {
        setSelectedRoom(room);
        return Success;
    }

    const roomFormConfig: ModalConfig = {
        size: ModalSize.MEDIUM,
        form: true,
        formDefinition: <RoomSettings createRoom={createRoom} />,
        header: "Room Configuration",
        acceptLabel: "Create",
        denyLabel: "Cancel",

        confirmation: false,
        confirmationMessage: "Are you sure you're ready to create this new room?",
        confirmationAcceptLabel: "Yes",
        confirmationDenyLabel: "No",

        cancelConfirmation: true,
        cancelConfirmationMessage: "Are you sure you want to cancel creating a room?",
        cancelConfirmationAcceptLabel: "Yes",
        cancelConfirmationDenyLabel: "No",

        confirmFunction: createRoom,
        cancelFunction: createRoomCancel
    }

    const renderLobby = () => {
        if (selectedRoom) {
            return <Room settings={selectedRoom} />
        }

        return <div className="LobbyDefault">
            <Button className="CreateRoom" intent="warning" onClick={createForm}>Create New Room</Button>
            {creatingRoom && <Modal config={roomFormConfig} />}
            <RoomBrowser rooms={rooms} roomSelect={handleRoomSelect} />
        </div>;
    }

    return (
        <div className="Lobby">
            {renderLobby()}
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