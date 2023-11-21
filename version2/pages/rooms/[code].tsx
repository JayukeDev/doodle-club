import { Card } from "@blueprintjs/core";
import { CSSProperties, useContext, useMemo, useState } from "react";
import Chat from "../../components/Chat";
import Roster from "../../components/Roster";
import { LocalColors } from "../../constants/LocalColors";
import { useFetchChat } from "../../hooks/useFetchChat";
import { useFetchRoster } from "../../hooks/useFetchRoster";
import { UserContext } from "../_app";
import { Player } from "../../types/Player";
import { io } from "socket.io-client";

export default function Room() {
    //const socket = io('https://localhost:3005');
    const [roster, setRoster] = useState({ teams: [], players: [] });
    const { user } = useContext(UserContext);
    const roomCode = user.code;

    // when the player first joins, we need them to select a team.
    // And then update the roster.
    /*const players = await useMemo(async () => {
        const roster = await useFetchRoster();
        console.log(roster);
        return roster.players;
    }, []);
    */

    const fetchPlayers = async () => {
        const roster = await useFetchRoster();
        setRoster(roster);
    };

    fetchPlayers();
    const leftChat = useFetchChat(roomCode, 1);
    const rightChat = useFetchChat(roomCode, 2);

    const [, setPlayer] = useState<Player | undefined>(undefined);
    const [playerPoints] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState(0);

    const selectTeam = (team: number) => {
        setSelectedTeam(team);
        setPlayer({
            displayName: user.name,
            team: selectedTeam,
            points: playerPoints
        });
        // todo: push to roster
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '100px' }}>
            <Card style={canvasContainerStyle}>
                <canvas style={canvasStyle}></canvas>
                <canvas style={canvasStyle}></canvas>
            </Card>
            <Card style={roomStyle}>
                <Roster
                    players={roster.players.filter(player => player.teamIndex === 1)}
                    style={rosterStyle}
                    team={1}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={selectTeam} />
                <Chat chat={leftChat} style={chatStyle} />
                <Chat chat={rightChat} style={chatStyle} />
                <Roster
                    players={roster.players.filter(player => player.teamIndex === 2)}
                    style={rosterStyle}
                    team={2}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={selectTeam} />
            </Card>
        </div>
    );
}

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
    fontSize: 20,
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
    opacity: '.8',
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '1200px',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '400px'
};

const canvasContainerStyle: CSSProperties = {
    opacity: '.9',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '1200px',
};