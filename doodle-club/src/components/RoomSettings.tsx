import { FC, FormEvent, useContext, useState } from 'react';
import { UserContext } from '../App';
import { RoomType } from '../types/RoomType';

export const RoomSettings: FC<{ createRoom(room: RoomType): void }> = ({ createRoom }) => {
    const { user } = useContext(UserContext);

    const [name, setName] = useState<string>("");
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [passCode, setPassCode] = useState<string>("");

    const [teamMin, setTeamMin] = useState<number>(0);
    const [teamMax, setTeamMax] = useState<number>(0);

    const [teamMemberMin, setTeamMemberMin] = useState<number>(0);
    const [teamMemberMax, setTeamMemberMax] = useState<number>(0);

    const [occupancyMax, setOccupancyMax] = useState<number>(0);

    const [isTeamAutoBalance, setIsTeamAutoBalance] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // TODO: Validation

        const room: RoomType = {
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
        console.log(event);
        createRoom(room);
    };

    return (
        <div className="RoomSettings">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Room Name</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={16} />
                <br />
                <label htmlFor="isPrivate">Private Room</label>
                <input type="checkbox" name="isPrivate" onChange={() => setIsPrivate(!isPrivate)} />

                {isPrivate &&
                    <label htmlFor="passCode">Pass Code</label> &&
                    <input type="text" name="passCode" value={passCode} onChange={(e) => setPassCode(e.target.value)} maxLength={10} />
                }
                <br />
                <label htmlFor="occupancyMax">Max Number of Participants</label>
                <input type="number" name="occupancyMax" value={occupancyMax} max={16} min={2} onChange={(e) => setOccupancyMax(Number.parseInt(e.target.value))} />
                <br />
                <label htmlFor="teamMin">Min Number of Teams</label>
                <input type="number" name="teamMin" value={teamMin} max={16} min={2} onChange={(e) => setTeamMin(Number.parseInt(e.target.value))} />
                <br />
                <label htmlFor="teamMax">Max Number of Teams</label>
                <input type="number" name="teamMax" value={teamMax} max={16} min={2} onChange={(e) => setTeamMax(Number.parseInt(e.target.value))} />
                <br />
                <label htmlFor="teamMemberMin">Min Members per Team</label>
                <input type="number" name="teamMemberMin" value={teamMemberMin} max={16} min={2} onChange={(e) => setTeamMemberMin(Number.parseInt(e.target.value))} />
                <br />
                <label htmlFor="teamMemberMax">Max Members per Team</label>
                <input type="number" name="teamMemberMax" value={teamMemberMax} max={16} min={2} onChange={(e) => setTeamMemberMax(Number.parseInt(e.target.value))} />
                <br />
                <label htmlFor="autoTeamBalance">Auto Team Balance</label>
                <input type="checkbox" name="autoTeamBalance" onChange={() => setIsTeamAutoBalance(!isTeamAutoBalance)} />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}