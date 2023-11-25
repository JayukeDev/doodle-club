import { Button, Card, InputGroup } from "@blueprintjs/core";
import { CSSProperties, useCallback, useMemo, useState } from "react";
import { ChatLine } from "../types/ChatLine";
import { Socket } from "socket.io-client";

interface ChatProps {
    chat: ChatLine[],
    style: CSSProperties,
    socket: Socket,
    fetchChat: () => void
}
export default function Chat({ chat, style, socket, fetchChat }: ChatProps) {
    const [chatLine, setChatLine] = useState("");
    const [chats, setChats] = useState([]);

    const postChat = (message: string) => { socket.emit('postChat', { playerId: "5", message }) };

    useMemo(() => {
        if(chat)
            setChats(chat.map(line => <li key={Date.now()}>{line.message}</li>));
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        postChat(chatLine);
        setChats([...chats, <li key={Date.now()}>{chatLine}</li>])
        setChatLine("");
    }

    useCallback((message: string) => {
        const objDiv = document.getElementById("chat123");
        objDiv.scrollTop = objDiv.scrollHeight;

        if(message){
            return [...chats, message];
        }
    }, [postChat]);

    useMemo(() => {
        socket.on('chatUpdate', () => fetchChat());
    }, []);

    return (
        <section style={style}>
            <Card id="chat123" style={{ height: '330px', overflow: 'auto', scrollSnapAlign: 'end' }}>
                <ul style={{ listStyleType: 'none', overflowAnchor: 'none'}}>
                    {chats}
                    <span style={{ overflowAnchor: 'auto' }} />
                </ul>
            </Card>
            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <InputGroup
                    style={{ position: 'relative', bottom: 0, width: '100%', border: 'none' }}
                    type="text"
                    placeholder="Guess Here!"
                    id="name-input"
                    value={chatLine}
                    onValueChange={(value) => setChatLine(value)} />
                <Button type='submit' intent='success'>submit</Button>
            </form>
        </section>
    )
}
