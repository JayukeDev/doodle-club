import { Button, Card, InputGroup } from "@blueprintjs/core";
import { CSSProperties, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatLine } from "../types/ChatLine";

interface ChatProps {
    chat: ChatLine[],
    style: CSSProperties,
    socket: Socket,
    isSelectedTeam: boolean
}
export default function Chat({ chat, style, socket, isSelectedTeam }: ChatProps) {
    const [chatLine, setChatLine] = useState("");

    const postChat = (message: string) => { socket.emit('postChat', { playerId: "5", message }) };

    async function handleSubmit(event) {
        event.preventDefault();

        postChat(chatLine);
        setChatLine("");
    }

    return (
        <section style={style}>
            <Card id="chat123" style={{ height: '330px', overflow: 'auto', scrollSnapAlign: 'end' }}>
                <ul style={{ listStyleType: 'none', overflowAnchor: 'none'}}>
                    {chat?.map(line => <li key={line.message + Math.random()}>{line.message}</li>)}
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
                    onValueChange={(value) => setChatLine(value)}
                    disabled={!isSelectedTeam} />
                <Button type='submit' intent='success' disabled={!isSelectedTeam}>submit</Button>
            </form>
        </section>
    )
}
