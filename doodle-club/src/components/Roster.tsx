import { FC } from "react";
import { Team } from "../types/TeamType";

export const Roster: FC<{ team: Team, rosterClick(team: Team): void }> = ({ team, rosterClick }) => {

    const handleRosterClick = () => {
        rosterClick(team);
    };

    return (
        <div className={`Roster ${team.name}`} onClick={handleRosterClick}>
            <h1>{team.name}</h1>
            <h2>{team.roster.length}</h2>
            <h3>{team.teamMemberMax}</h3>
            {team.roster.map((user) => {
                return <h4>{user.name}</h4>
            })}
        </div>
    );
}