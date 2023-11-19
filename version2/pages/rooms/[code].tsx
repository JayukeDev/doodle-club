import { Card } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import Chat from "../../components/Chat";
import Roster from "../../components/Roster";
import { LocalColors } from "../../constants/LocalColors";
import { useFetchChat } from "../../hooks/useFetchChat";
import { useFetchRoster } from "../../hooks/useFetchRoster";

export default function Room() {
    const router = useRouter();
    const roomCode = router.query.code as string;

    const { players } = useFetchRoster();
    const leftChat =  useFetchChat(roomCode, 1);
    const rightChat = useFetchChat(roomCode, 2);
    // Canvas
    const canvasStyle: CSSProperties = {
        width: '450px',
        height: '350px',
        border: '2px solid #000000'
    };

    const rosterStyle: CSSProperties = {
        backgroundColor: LocalColors.Green,
        height: '100%',
        width: '350px',
        color: LocalColors.Blue,
        fontSize: 30,
        fontFamily: '"Trebuchet MS", sans-serif',
        fontWeight: 'bold',
        border: '1px solid',
    };

    const chatStyle: CSSProperties = {
        backgroundColor: LocalColors.Orange,
        height: '100%',
        width: '220px',
        border: '1px solid',
    };

    const roomStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        width: '1200px',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '400px'
    };

    const canvasContainerStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1200px',
    };

    return (
        <>
            <Card style={canvasContainerStyle}>
                <canvas style={canvasStyle}></canvas>
                <canvas style={canvasStyle}></canvas>
            </Card>
            <Card style={roomStyle}>
                <Roster players={players.filter(player => player.team === 1)} style={rosterStyle} />
                <Chat chat={leftChat} style={chatStyle} />
                <Chat chat={rightChat} style={chatStyle} />
                <Roster players={players.filter(player => player.team === 2)} style={rosterStyle} />
            </Card>
        </>
    );
}