export interface Game {
    state: 'new' | 'inProgress' | 'complete',
    currentWord: string[],
    hintDisplay: string[],
    usedWords: string[][],

    teamStrikes: number[],
    teamPoints: number[],

    currentArtistPlayerId: string[],
    artistOrder: string[][],
    usedArtists: string[][];
}