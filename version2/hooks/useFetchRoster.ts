import { Player } from "../types/Player";
import { Team } from "../types/Team";

/**
 * Fetches the Current Team rosters and Players.
 * @returns team: { displayName, players[] }[], players: { displayName, team, points }[]
 */
export const useFetchRoster = async (): Promise<{ teams: Team[], players: Player[] }> => {
    const mockPlayers: Player[] = [
        { displayName: "jack", team: 1, points: 100 },
        { displayName: "Timmy", team: 1, points: 200 },
        { displayName: "Jimmy", team: 2, points: 0 },
        { displayName: "Ronny", team: 2, points: 10 },
    ];

    const mockTeams: Team[] = [
        { displayName: "Tigers", players: [mockPlayers[0], mockPlayers[1]] },
        { displayName: "Cranes", players: [mockPlayers[2], mockPlayers[3]] },
    ]

    let roster = {
        teams: mockTeams,
        players: mockPlayers
    };

    const response = await fetch('http://localhost:3005/roster', {
        method: 'get'
    });
    console.log('XXXXXXXXXXX RSPSNS', response);
    const rostah = await response.json();
    return rostah;
};