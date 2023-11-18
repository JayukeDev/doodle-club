import { Player } from "../types/Player";
import { Team } from "../types/Team";

export const useFetchRoster = () => {
    const mockPlayers: Player[] = [
        { displayName: "Bobby", team: 1, points: 100 },
        { displayName: "Timmy", team: 1, points: 200 },
        { displayName: "Jimmy", team: 2, points: 0 },
        { displayName: "Ronny", team: 2, points: 10 },
    ];

    const mockTeams: Team[] = [
        { displayName: "Tigers", players: [mockPlayers[0], mockPlayers[1]] },
        { displayName: "Cranes", players: [mockPlayers[2], mockPlayers[3]] },
    ]
    return {
        teams: mockTeams,
        players: mockPlayers
    };
};