import { Player } from "../types/Player";
import { Team } from "../types/Team";

/**
 * Fetches the Current Team rosters and Players.
 * @returns team: { displayName, players[] }[], players: { displayName, team, points }[]
 */
export const useFetchRoster = async (): Promise<{ teams: Team[], players: Player[] }> => {
    const response = await fetch('http://localhost:3005/roster', {
        method: 'get'
    });
    const rostah = await response.json();
    console.log('XXXXXXXXXXX RSPSNS', rostah);
    return rostah;
};