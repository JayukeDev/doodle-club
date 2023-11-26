import { WordBankID } from "../constants/WordBanks";

export interface RoomSettings {
    gameMode: string;
    wordBank: WordBankID;
    customWords: string[];

    drawTime: number;
    teams: number;
    teamPlayers: number;
    hints: number;

    isHints: boolean;
    isAutoTeamBalance: boolean;
}