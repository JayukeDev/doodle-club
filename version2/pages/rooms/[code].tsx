import { Card, Dialog, DialogBody } from "@blueprintjs/core";
import { CSSProperties, useContext, useMemo, useState } from "react";
import { Socket } from "socket.io-client";
import Chat from "../../components/Chat";
import Roster from "../../components/Roster";
import { LocalColors } from "../../constants/LocalColors";
import { useFetchChat } from "../../hooks/useFetchChat";
import { useFetchRoster } from "../../hooks/useFetchRoster";
import { Player } from "../../types/Player";
import { UserContext } from "../_app";
import RoomSettingsForm from "../../components/RoomSettingsForm";
import { RoomSettings } from "../../types/RoomSettings";
interface RoomProps {
    socket: Socket
}
export default function Room({ socket }: RoomProps) {
    //const socket = io('https://localhost:3005');
    const [roster, setRoster] = useState({ teams: [], players: [] });
    const [roomSettings, setRoomSettings] = useState<RoomSettings | undefined>();
    const [chat, setChat] = useState([[]]);
    const { user } = useContext(UserContext);

    const fetchPlayers = async () => {
        const roster = await useFetchRoster();
        setRoster(roster);
    };

    const fetchChat = async () => {
        const chat = await useFetchChat();
        setChat(chat);
    }

    useMemo(() => {
        // fetch players on initial load
        fetchPlayers();
        fetchChat();
    }, []);

    const [, setPlayer] = useState<Player | undefined>(undefined);
    const [playerPoints] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState(0);

    const selectTeam = (team: number) => {
        console.log(`set selected team ${team}`);
        setSelectedTeam(team);
        const player = {
            displayName: user.name,
            team: team,
            points: playerPoints
        };
        setPlayer(player);
        console.log('joining team');
        socket.emit("joinTeam", { displayName: player.displayName, team: player.team });
    };

    useMemo(() => {
        socket.on('rosterUpdate', () => { console.log('roster update'); return fetchPlayers() });
        socket.on('chatUpdate', () => fetchChat());
    }, [socket]);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '100px' }}>
            <Dialog isOpen={!roomSettings} style={{ width: '1000px' }}>
                <DialogBody>
                    <RoomSettingsForm format="full" handleSubmit={settings => setRoomSettings(settings)} />
                </DialogBody>
            </Dialog>

            <Card style={canvasContainerStyle}>
                <canvas style={canvasStyle}></canvas>
                <canvas style={canvasStyle}></canvas>
            </Card>
            <Card style={roomStyle}>
                <Roster
                    players={roster.players.filter(player => player.team === 1)}
                    style={rosterStyle}
                    team={1}
                    selectedTeam={selectedTeam}
                    setSelectedTeam={selectTeam} />
                <Chat chat={chat[1]} style={chatStyle} socket={socket} isSelectedTeam={selectedTeam === 1} />
                <Chat chat={chat[2]} style={chatStyle} socket={socket} isSelectedTeam={selectedTeam === 2} />
                <Roster
                    players={roster.players.filter(player => player.team === 2)}
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