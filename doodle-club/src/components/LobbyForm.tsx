import React, { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../App';
import { User } from '../types/UserType';

export function LobbyForm() {
    const { user, setUser } = useContext(UserContext);
    const [lobbyForm, setLobbyForm] = useState<LobbyFormDefinition>();

    const [name, setName] = useState<string>();
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [passCode, setPassCode] = useState<string>();

    const [teamMin, setTeamMin] = useState<number>(0);
    const [teamMax, setTeamMax] = useState<number>(0);

    const [teamMemberMin, setTeamMemberMin] = useState<number>(0);
    const [teamMemberMax, setTeamMemberMax] = useState<number>(0);

    const [occupancyMax, setOccupancyMax] = useState<number>(0);

    const [isTeamAutoBalance, setIsTeamAutoBalance] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // TODO: Validation

        const lobby: LobbyFormDefinition = {
            _id: name!,
            adminId: user?._id!,
            name: name!,
            passCode: passCode!,
            occupancyMax: occupancyMax,
            teamMin: teamMin,
            teamMax: teamMax,
            teamMemberMin: teamMemberMin,
            teamMemberMax: teamMemberMax,
            teamAutoBalance: isTeamAutoBalance
        }

        setLobbyForm(lobby);
    }

    return (
    <div className="LoginForm">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Room Name</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={16} />

            <label htmlFor="isPrivate">Private Room</label>
            <input type="checkbox" name="isPrivate" onChange={() => setIsPrivate(!isPrivate)} />

            { isPrivate && 
                <label htmlFor="passCode">Pass Code</label> &&
                <input name="string" title="passCode" value={passCode} onChange={(e) => setPassCode(e.target.value)} maxLength={10} /> 
            }

            <label htmlFor="occupancyMax">Max Number of Participants</label>
            <input type="number" name="occupancyMax" value={occupancyMax} max={16} min={2} onChange={(e) => setOccupancyMax(Number.parseInt(e.target.value))} />

            <label htmlFor="teamMin">Min Number of Teams</label>
            <input type="number" name="teamMin" value={teamMin} max={16} min={2} onChange={(e) => setTeamMin(Number.parseInt(e.target.value))} />

            <label htmlFor="teamMax">Max Number of Teams</label>
            <input type="number" name="teamMax" value={teamMax} max={16} min={2} onChange={(e) => setTeamMax(Number.parseInt(e.target.value))} />

            <label htmlFor="teamMemberMin">Min Members per Team</label>
            <input type="number" name="teamMemberMin" value={teamMemberMin} max={16} min={2} onChange={(e) => setTeamMemberMin(Number.parseInt(e.target.value))} />

            <label htmlFor="teamMemberMax">Max Members per Team</label>
            <input type="number" name="teamMemberMax" value={teamMemberMax} max={16} min={2} onChange={(e) => setTeamMemberMax(Number.parseInt(e.target.value))} />

            <label htmlFor="autoTeamBalance">Auto Team Balance</label>
            <input type="checkbox" name="autoTeamBalance"  onChange={() => setIsTeamAutoBalance(!isTeamAutoBalance)} />
        
            <input type="submit" />
        </form>
    </div>
    );
}

interface LobbyFormDefinition {
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