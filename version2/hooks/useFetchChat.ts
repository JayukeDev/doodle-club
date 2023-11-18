import { ChatLine } from "../types/ChatLine";

export const useFetchChat = (code: string, team: number): ChatLine[] => {
    const mockTeam1Chat = [
        { playerId: "1", message: "bitcoin" },
        { playerId: "2", message: "bitcoin" },
        { playerId: "2", message: "bitcoin" },
        { playerId: "1", message: "bitcoin" },
        { playerId: "1", message: "bitcoin" },
    ];

    const mockTeam2Chat = [
        { playerId: "3", message: "i roke up" },
        { playerId: "4", message: "spaghetti" },
        { playerId: "4", message: "yoinks" },
        { playerId: "3", message: "bitcoin" },
        { playerId: "4", message: "bitcoin" },
    ];
    return team === 1 ? mockTeam1Chat : mockTeam2Chat;
};