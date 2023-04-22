import { FC, useContext, useState } from "react";
import { Success, UserContext } from "../App";
import { JoinTeamForm } from "../components/JoinTeamForm";
import { Modal, ModalConfig, ModalSize, Result } from "../components/Modal";
import { Roster } from "../components/Roster";
import { RoomType } from "../types/RoomType";
import { RoomUserContextType } from "../types/RoomUserContextType";
import { Team } from "../types/TeamType";

export const Room: FC<{ settings?: RoomType }> = ({ settings }) => {
    const { user } = useContext(UserContext);
    const [userRoomContext, setUserRoomContext] = useState(user as RoomUserContextType);
    const [gameSettings, setGameSettings] = useState(mockGameSettings);


    const handleJoinTeam = (team: Team) => {
        setUserRoomContext({ team: team });
        return Success;
    };

    const handleSpectate = () => {
        // do something for spectators?
        const result: Result = { success: false, errorMessages: ["Not yet implemented."] };
        return result;
    }

    const joinTeamConfig: ModalConfig = {
        size: ModalSize.LARGE,
        header: "Join a Team",
        message: "TODO game description",
        denyLabel: "Spectate",
        form: true,
        formDefinition: <JoinTeamForm teams={gameSettings.teams} handleRosterClick={handleJoinTeam} />,

        confirmFunction: handleJoinTeam,
        cancelFunction: handleSpectate
    };

    /*
        views:
            GameSettings
            Game
            Chat
            Roster
            Scoreboard
            JoinTeamForm
    */
    const renderRoomView = () => {
        if (!userRoomContext.team) {
            return <Modal config={joinTeamConfig} />;
        }


        return gameSettings.teams.map((team) => <Roster team={team} rosterClick={() => { }} />);
    };

    return (
        <div className="Room">
            {renderRoomView()}
        </div>
    );
}

export interface GameSettings {
    gameType: GameType;
    teams: Team[];
}

export enum GameType {
    STANDARD
}

const mockGameSettings: GameSettings = {
    gameType: GameType.STANDARD,
    teams: [{ name: "Tigers", roster: [{ _id: "ean", name: "Ean" }, { _id: "sean", name: "Sean" }, { _id: "jean", name: "Jean" },], teamMemberMax: 10 },
    { name: "Cranes", roster: [{ _id: "rick", name: "Rick" }, { _id: "dick", name: "Dick" }, { _id: "fredrick", name: "Fredrick" },], teamMemberMax: 10 }]
}