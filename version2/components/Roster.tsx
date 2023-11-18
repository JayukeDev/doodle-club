import { Card, CardList } from "@blueprintjs/core";

export default function Roster({ players }) {
    const playerCards = players.map(player => <Card>{player.displayName}</Card>);
    return (
        <CardList>
            {playerCards};
        </CardList>
    );
}
