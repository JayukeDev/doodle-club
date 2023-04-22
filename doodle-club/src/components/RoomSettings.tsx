import { Colors, Elevation } from '@blueprintjs/core';
import { Button, Card, Checkbox, Divider, FormGroup, InputGroup, NumericInput } from '@blueprintjs/core/lib/esm/components';
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

    const handleSubmit = () => {

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
        createRoom(room);
    };

    const cardStyle = {
        color: Colors.LIGHT_GRAY3,
        background: Colors.DARK_GRAY5
    }

    return (
        <Card className="RoomSettings" elevation={Elevation.ONE} style={cardStyle} >
            <FormGroup className="RoomSettingsFormGroup">
                <label className="label" htmlFor="name" value-attr="Room Name">
                <InputGroup  type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={16} />
                </label>
                <label className="label" htmlFor="isPrivate" value-attr="Private Room">
                <Checkbox type="checkbox" name="isPrivate" onChange={() => setIsPrivate(!isPrivate)} />
                </label>
                {isPrivate &&
                    <label className="label" htmlFor="passCode" value-attr="Pass Code">
                    <InputGroup type="text" name="passCode" value={passCode} onChange={(e) => setPassCode(e.target.value)} maxLength={10} />
                    </label>
                }

                <label className="label" htmlFor="occupancyMax" value-attr="Max Number of Participants">
                <NumericInput  type="number" name="occupancyMax" value={occupancyMax} max={16} min={2} onValueChange={setOccupancyMax} />
                </label>
                <label className="label" htmlFor="teamMin" value-attr="Min Number of Teams">
                <NumericInput  type="number" name="teamMin" value={teamMin} max={16} min={2} onValueChange={setTeamMin} />
                </label>
                <label className="label" htmlFor="teamMax" value-attr="Max Number of Teams">
                <NumericInput  type="number" name="teamMax" value={teamMax} max={16} min={2} onValueChange={setTeamMax} />
                </label>
                <label className="label" htmlFor="teamMemberMin" value-attr="Min Members per Team">
                <NumericInput  type="number" name="teamMemberMin" value={teamMemberMin} max={16} min={2} onValueChange={setTeamMemberMin} />
                </label>
                <label className="label" htmlFor="teamMemberMax" value-attr="Max Members per Team">
                <NumericInput  type="number" name="teamMemberMax" value={teamMemberMax} max={16} min={2} onValueChange={setTeamMemberMax} />
                </label>
                <label className="label" htmlFor="autoTeamBalance" value-attr="Auto Team Balance">
                <Checkbox type="checkbox" name="autoTeamBalance" onChange={() => setIsTeamAutoBalance(!isTeamAutoBalance)} />
                </label>
                <Button type="submit" intent="success" onClick={handleSubmit}>Create Room</Button>
            </FormGroup>
        </Card>
    );
}

/*
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
                <Button type="submit" intent="success">Create Room</Button>
            </form>
            */