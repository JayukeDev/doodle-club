import { RoomSettings } from "./RoomSettings";

export interface Game {
    settings: RoomSettings,
    state: 'new' | 'inProgress' | 'complete',
    currentWord: string,
    hintDisplay: string,
    usedWords: string[],

    teamStrikes: number[],
    teamPoints: number[],

    currentArtistPlayerId: string[],
    artistOrder: string[][]
}