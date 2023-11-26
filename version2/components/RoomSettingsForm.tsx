import { Button, Card, Checkbox, Elevation, FormGroup, InputGroup, MenuItem, NumericInput, TextArea } from "@blueprintjs/core";
import { ItemRenderer, Select } from "@blueprintjs/select";
import { useState } from "react";
import { WordBankID, WordBankOptions } from "../constants/WordBanks";
import { RoomSettings } from "../types/RoomSettings";

// most of the following should take place in the consuming component of this.
// THis should just expose the raw form and mini form for room settings.
// On creation of a new room, the settings should be open, and 
// clicking play will start the game.

// For now, settings can't be re-opened until the game ends.
// The room creator should have the option to end the game to
// prematurely open the settings.

// So, overall there are two scenarios that would lead to opening the settings.

// When the game has started, there should be a miniature control for game settings,
// only exposing 'hints', 'isHints', 'isAutoTeamBalance'
interface RoomSettingsProps {
    format: 'full' | 'mini',
    handleSubmit: (settings) => void
}
export default function RoomSettingsForm({ format, handleSubmit }: RoomSettingsProps) {
    const [settings, setSettings] = useState(defaultSettings);

    async function onSubmit(event) {
        event.preventDefault();
        handleSubmit(settings);
    }

    const renderWordBank: ItemRenderer<WordBankID> = (wordBankId, { handleClick, handleFocus, modifiers }) => {
        return (
            <MenuItem
                active={modifiers.active}
                disabled={modifiers.disabled}
                key={wordBankId}
                label={wordBankId}
                onClick={handleClick}
                onFocus={handleFocus}
                roleStructure="listoption"
                text={wordBankId}
            />
        );
    }

    const fullFormat = (
        <Card elevation={Elevation.FOUR} style={{ width: "100%", justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
            <h1>ROOM SETTINGS</h1>
            <form onSubmit={onSubmit} style={{ position: 'relative', bottom: 0, fontSize: 'large', width:"100%" }}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '50%' }}>
                        <FormGroup
                            label="Mode"
                            labelFor="mode-input"
                            inline
                        />
                        <InputGroup
                            type="text"
                            id="mode-input"
                            value={settings.gameMode}
                            onValueChange={(value) => setSettings({ ...settings, gameMode: value })} />

                        <FormGroup
                            label="# of Teams"
                            labelFor="teams-number"
                            inline
                        />
                        <NumericInput
                            id="teams-number"
                            value={settings.teams}
                            min={2}
                            max={2}
                            onValueChange={(value) => setSettings({ ...settings, teams: value })} />

                        <FormGroup
                            label="# of Players per Team"
                            labelFor="players-number"
                            inline
                        />
                        <NumericInput
                            id="players-number"
                            value={settings.teamPlayers}
                            min={2}
                            max={6}
                            onValueChange={(value) => setSettings({ ...settings, teamPlayers: value })} />

                        <FormGroup
                            label="Draw Time"
                            labelFor="draw-time-number"
                            inline
                        />
                        <NumericInput
                            id="draw-time-number"
                            value={settings.drawTime}
                            min={20}
                            max={120}
                            onValueChange={(value) => setSettings({ ...settings, drawTime: value })} />
                    </div>
                    <div style={{ width: '50%', paddingLeft: '5%' }}>
                        <FormGroup
                            label="Hints"
                            labelFor="isHints-checkbox"
                            inline
                        />
                        <Checkbox inline id="isHints-checkbox" checked={settings.isHints} onChange={() => setSettings({ ...settings, isHints: !settings.isHints })} />
                        {settings.isHints ?
                            <NumericInput
                                value={settings.hints}
                                min={1}
                                max={6}
                                onValueChange={(value) => setSettings({ ...settings, hints: value })} />
                            : <></>}
                        <FormGroup
                            label="Word Bank"
                            labelFor="bank-input"
                            inline
                        />
                        <Select<WordBankID>
                            items={WordBankOptions}
                            itemRenderer={renderWordBank}
                            onItemSelect={value => setSettings({ ...settings, wordBank: value })}>
                            <Button text={settings.wordBank} rightIcon="double-caret-vertical" placeholder="Select a Word Bank" />
                        </Select>
                        <FormGroup
                            label="Custom Words"
                            labelFor="custom-words-input"
                            inline
                        />
                        <TextArea
                            large
                            style={{width:'100%', height:'30%'}}
                            value={settings.customWords}
                            onChange={value => setSettings({ ...settings, customWords: value.target.value.split(" ") })}
                        />
                    </div>
                </div>
                <Button text="Play" large type='submit' style={{
                    color: 'white',
                    backgroundColor: 'green',
                    marginTop: '40px',
                    width: '100%',
                }} />
            </form>
        </Card>
    )
    return fullFormat;
}
const defaultSettings: RoomSettings = {
    gameMode: "",
    wordBank: "default",
    customWords: [],

    drawTime: 60,
    teams: 2,
    teamPlayers: 6,
    hints: 2,

    isHints: true,
    isAutoTeamBalance: true
}