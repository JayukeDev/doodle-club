import { ChatLine } from "../types/ChatLine";

export const useFetchChat = async (): Promise<ChatLine[][]> => {
    const response = await fetch('http://localhost:3005/chat', {
        method: 'get'
    });

    const chat = await response.json();

    console.log('XXXXXXXXXXX CHAT RSPSNS', chat);
    return chat;
};