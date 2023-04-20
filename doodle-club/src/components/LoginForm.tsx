import { FC, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../App';
import { UserType } from '../types/UserType';


export const LoginForm: FC = () => {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const user: UserType = {
            _id: name,
            name: name
        }

        setUser && setUser(user);
    }

    return (
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <h2>Name</h2>
                <p>Please enter a name to continue.</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={16}
                />

                <hr />
                <input type="submit" />
            </form>
        </div>
    );
}