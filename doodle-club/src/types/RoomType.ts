export interface RoomType {
    _id: string;
    name: string;
    passCode: string;

    adminId: string;

    occupancyMax: number;

    teamMin: number;
    teamMax: number;

    teamMemberMin: number;
    teamMemberMax: number;

    teamAutoBalance: boolean;
}