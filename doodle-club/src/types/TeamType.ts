import { UserType } from "./UserType";

export interface Team {
    name?: string;
    roster: UserType[];
    teamMemberMax: number;
}