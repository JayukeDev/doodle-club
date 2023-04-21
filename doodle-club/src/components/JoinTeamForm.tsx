import { FC } from "react";
import { Team } from "../types/TeamType";
import { Roster } from "./Roster";

export const JoinTeamForm: FC<{ teams: Team[], handleRosterClick(team: Team): void }> = ({ teams, handleRosterClick }) => {

    const createTeamView = () => teams.map((team) => <Roster team={team} rosterClick={handleRosterClick} />);

    return (
        <div className="JoinTeamForm">
            {createTeamView()}
        </div>
    );
}