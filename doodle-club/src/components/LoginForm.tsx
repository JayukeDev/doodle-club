import { FC, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../App';
import { UserType } from '../types/UserType';
import { Button } from '@blueprintjs/core';
import { Colors } from '@blueprintjs/core/lib/esm/common';
import { InputGroup } from '@blueprintjs/core/lib/esm/components';


export const LoginForm: FC = () => {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState("");
    const [roomCode, setRoomCode] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        console.log(event);
        event.preventDefault();
        const user: UserType = {
            _id: name,
            name: name
        }

        setUser && setUser(user);
    };

    const joinRoomText = () => `Join ${roomCode ? roomCode : "a Random Room"}`;

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <h2>Join a Room</h2>
                <p>Please enter a name to continue.</p>
                <InputGroup
                    round
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={16}
                    placeholder="Name"
                    style={{background: Colors.LIGHT_GRAY1, color: Colors.BLACK, fontWeight: 'bolder' }}
                />
                <br />
                <InputGroup
                    round
                    small
                    type="text"
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    maxLength={16}
                    placeholder="Room Code"
                    style={{background: Colors.GRAY4, color: Colors.BLACK }}
                />
                <br />
                <br />
                <Button intent='success' text={joinRoomText()} type='submit' />
            </form>
        </div>
    );
}