import { Colors, Elevation } from "@blueprintjs/core";
import { Card } from "@blueprintjs/core/lib/esm/components";
import { FC } from "react";
import { Team } from "../types/TeamType";

export const Roster: FC<{ team: Team, rosterClick(team: Team): void }> = ({ team, rosterClick }) => {

    const handleRosterClick = () => {
        rosterClick(team);
    };
    
    const cardStyle = {
        color: Colors.LIGHT_GRAY3,
        background: Colors.DARK_GRAY4
    }

    return (
        <Card className={`Roster ${team.name}`} onClick={handleRosterClick} elevation={Elevation.TWO} style={cardStyle} interactive={true}>
            <h1>{team.name}</h1>
            <h2>{team.roster.length}/{team.teamMemberMax}</h2>
            {team.roster.map((user) => {
                return <h4>{user.name}</h4>
            })}
        </Card>
    );
}