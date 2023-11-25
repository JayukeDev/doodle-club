import { Player } from "./types/Player";
import { Team } from "./types/Team";

const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('postChat', ({ playerId, message }) => {
        const player = players.find(player => player.id === playerId);
        if(!player)
            return console.log(`no player with id ${playerId} to post chat ${message}`);

        console.log(`post chat: ${playerId} ${message} team ${player.team}`);
        chat[player.team ?? 1].push({ playerId, message });

        socket.emit('chatUpdate');
    });

    socket.on('joinTeam', ({ displayName, team, id }) => {
        const player = { id: id ?? "5", points: 0, displayName, team: Number(team) };
        players.push(player);
        console.log(`rosterUpdate: ${JSON.stringify(player)}`)
        socket.emit('rosterUpdate');
    });
});

httpServer.listen(3005, () => {
    console.log('listening on *:3005');
});

app.get('/teams', (req, res) => {
    res.status(200).send(teams);
});

app.get('/roster', (req, res) => {
    const roster = {
        teams: teams,
        players: players
    };
    console.log(`fetch roster: ${JSON.stringify(roster)}`)
    res.header("Access-Control-Allow-Origin", "*").send(roster);
});

app.get('/chat', (req, res) => {
    console.log(`fetch chat: ${chat[0].length + chat[1].length} total messages`);
    res.header("Access-Control-Allow-Origin", "*").send(chat);
});

const mockTeam1Chat = [
    { playerId: "1", message: "bitcoin" },
    { playerId: "2", message: "bitc2oin" },
    { playerId: "2", message: "bitc3oin" },
    { playerId: "1", message: "bitco2in" },
    { playerId: "1", message: "bit5coin" },
];

const mockTeam2Chat = [
    { playerId: "3", message: "i roke up" },
    { playerId: "4", message: "spaghetti" },
    { playerId: "4", message: "yoinks" },
    { playerId: "3", message: "bitco2in" },
    { playerId: "4", message: "bitcoi5n" },
];

const mockPlayers: Player[] = [
    { id: "1", displayName: "Bibby", team: 1, points: 0 },
    { id: "2", displayName: "Timmy", team: 1, points: 0 },
    { id: "3", displayName: "Jimmy", team: 2, points: 0 },
    { id: "4", displayName: "Ronny", team: 2, points: 0 },
]

const mockTeams: Team[] = [
    { id: "1", displayName: "Tigers" },
    { id: "2", displayName: "Cranes" },
];

const players = [...mockPlayers];
const teams = [...mockTeams];
const chat = [[], mockTeam1Chat, mockTeam2Chat];