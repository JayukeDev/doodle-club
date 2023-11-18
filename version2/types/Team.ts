import { Player } from "./Player";

export interface Team {
    id?: string;
    displayName: string;
    players: Player[];
}