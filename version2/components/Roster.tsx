import { Button, Card, CardList } from "@blueprintjs/core";
import { Player } from "../types/Player";
import { CSSProperties } from "react";

interface RosterProps {
    team: number,
    players: Player[],
    selectedTeam: number,
    setSelectedTeam: (team: number) => void,
    style: CSSProperties
}
export default function Roster({ team, players, style, selectedTeam, setSelectedTeam }: RosterProps) {
    const playerCards = players.map(player => <Card key={player.displayName}>{player.displayName}</Card>);
    return (
        <>
            <CardList style={style}>
                {playerCards}
                {!selectedTeam &&
                <Button
                    text="Join Team"
                    onClick={() => setSelectedTeam(team)} />}
            </CardList>
        </>
    );
}
