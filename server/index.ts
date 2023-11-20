import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import { Server } from "socket.io";
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('post chat', (message: string) => {
        console.log('message: ' + message);
    });
});

server.listen(3005, () => {
    console.log('listening on *:3005');
});

app.get('/teams', (req, res) => {
    res.status(200).send(teams);
});

app.get('/roster', (req, res) => {
    const roster = players.filter(player => player.teamIndex === req.body.teamIndex);
    res.status(200).send(roster);
});

app.post('/join', (req, res) => {
    const player = { id: "5", displayName: req.body.displayName, teamIndex: req.body.teamIndex };
    players.push(player);
    res.status(200).send();
});

interface Player {
    id: string,
    displayName: string,
    teamIndex: number
}

interface Team {
    id: string,
    displayName: string,
    index: number
}

const mockPlayers: Player[] = [
    { id: "1", displayName: "Bibby", teamIndex: 1 },
    { id: "2", displayName: "Timmy", teamIndex: 1 },
    { id: "3", displayName: "Jimmy", teamIndex: 2 },
    { id: "4", displayName: "Ronny", teamIndex: 2 },
]

const mockTeams: Team[] = [
    { id: "1", displayName: "Tigers", index: 1 },
    { id: "2", displayName: "Cranes", index: 2 },
];

const players = [...mockPlayers];
const teams = [...mockTeams];