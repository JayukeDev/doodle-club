import { Card, InputGroup } from "@blueprintjs/core"

export default function Chat({ chat }) {
    const chats = chat.map(line => <li>{line.message}</li>)
    return (
        <Card>
            <ul>
                {chats}
            </ul>
            <InputGroup
                type="text"
                placeholder="Guess Here!"
                id="name-input"
                onValueChange={(value) => postChat(value)} />
        </Card>
    )
}

const postChat = (message: string) => console.log(message);
