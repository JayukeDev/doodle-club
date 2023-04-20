import { FC, useState } from "react"
import { Modal, ModalConfig, ModalSize, Result } from "../components/Modal";
import { RoomBrowser } from "../components/RoomBrowser";
import { RoomSettings } from "../components/RoomSettings";
import { RoomType } from "../types/RoomType";

export const Lobby: FC = () => {
    const [creatingRoom, setCreatingRoom] = useState(false);
    const [rooms, setRooms] = useState(mockRooms);

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

        const result: Result = {
            success: true
        }

        return result;
    }

    const createRoomCancel = (): Result => {
        setCreatingRoom(false);
        const result: Result = {
            success: true
        }

        return result;
    }

    const roomFormConfig: ModalConfig = {
        size: ModalSize.MEDIUM,
        form: true,
        formDefinition: <RoomSettings createRoom={createRoom} />,
        header: "Create New Room",
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

    return (
        <div className="Lobby">
            <button name="Create Room" onClick={createForm}>Create New Room</button>
            <hr />
            { creatingRoom && <Modal config={roomFormConfig}/> }
            <RoomBrowser rooms={rooms} />
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