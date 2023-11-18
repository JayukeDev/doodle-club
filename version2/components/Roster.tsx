import { Card, CardList } from "@blueprintjs/core";

export default function Roster({ players, style }) {
    const playerCards = players.map(player => <Card>{player.displayName}</Card>);
    return (
        <CardList style={style}>
            {playerCards}
        </CardList>
    );
}
