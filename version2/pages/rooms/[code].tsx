import { Card } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import Chat from "../../components/Chat";
import Roster from "../../components/Roster";
import { useFetchChat } from "../../hooks/useFetchChat";
import { useFetchRoster } from "../../hooks/useFetchRoster";

export default function Room() {
    const router = useRouter();
    let roomCode = router.query.code as string;

    const { teams, players } = useFetchRoster();
    const leftChat = useFetchChat(roomCode, 1);
    const rightChat = useFetchChat(roomCode, 2);
    // Canvas
    const canvasStyle: CSSProperties = {
        width: '500px',
        height: '400px'
    }
    const canvas = <canvas style={canvasStyle}></canvas>;
    return (
        <Card>
            <Roster players={players.filter(player => player.team === 1)} />
            <Chat chat={leftChat} />
            <canvas style={canvasStyle}></canvas>
            <canvas style={canvasStyle}></canvas>
            <Chat chat={rightChat} />
            <Roster players={players.filter(player => player.team === 2)} />
        </Card>
    );
};