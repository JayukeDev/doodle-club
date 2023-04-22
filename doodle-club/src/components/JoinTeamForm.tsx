import { FC } from "react";
import { Team } from "../types/TeamType";
import { Roster } from "./Roster";

export const JoinTeamForm: FC<{ teams: Team[], handleRosterClick(team: Team): void }> = ({ teams, handleRosterClick }) => {

    const createTeamView = () => teams.map((team) => <div className="Center"><Roster team={team} rosterClick={handleRosterClick} /></div>);

    return (
        <div className="JoinTeamForm">
            {createTeamView()}
        </div>
    );
}