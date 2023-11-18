import { Button, Card, InputGroup } from "@blueprintjs/core"
import { useCallback, useMemo, useState } from "react";

export default function Chat({ chat, style }) {
    const [chatLine, setChatLine] = useState("");
    const [chats, setChats] = useState(chat.map(line => <li>{line.message}</li>));

    const postChat = (message: string) => { console.log(message); };

    async function handleSubmit(event) {
        event.preventDefault();

        postChat(chatLine);
        setChats([...chats, <li>{chatLine}</li>])
        setChatLine("");
    }

    useCallback((message: string) => {
        var objDiv = document.getElementById("chat123");
        objDiv.scrollTop = objDiv.scrollHeight;

        if(message){
            return [...chats, message];
        };
    }, [postChat]);

    return (
        <section style={style}>
            <Card id="chat123" style={{ height: '365px', overflow: 'auto', scrollSnapAlign: 'end' }}>
                <ul style={{ listStyleType: 'none', overflowAnchor: 'none'}}>
                    {chats}
                    <span style={{ overflowAnchor: 'auto' }} />
                </ul>
            </Card>
            <form onSubmit={handleSubmit}>
                <InputGroup
                    style={{ position: 'relative', bottom: 0, width: '100%', border: 'none' }}
                    type="text"
                    placeholder="Guess Here!"
                    id="name-input"
                    value={chatLine}
                    onValueChange={(value) => setChatLine(value)} />
                <Button type='submit'>submit</Button>
            </form>
        </section>
    )
}
