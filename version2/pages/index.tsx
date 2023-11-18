import { Button, Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { useState } from 'react';

export default function Home() {
  const [user, setUser] = useState({ name: "", code: "" });
  const [form, setForm] = useState({ name: "", code: "" });
  const existingRooms = ["1234", "abcd"];

  async function handleSubmit(event) {
    event.preventDefault();

    // if we have no code, join public room

    // verify room with code exists otherwise:
    if (form.code && !existingRooms.find(entry => entry === form.code))
      return alert(`No room with code ${form.code} found.`);

    setUser(form);
  }

  return (
    <Card elevation={Elevation.TWO}>
      <form onSubmit={handleSubmit}>
        <h1>Test</h1>
        <FormGroup
          label="Name"
          labelFor="name-input"
          helperText="Enter a name. This will be displayed to all players."
        />
        <InputGroup type="text" id="name-input" value={form.name} onValueChange={(value) => setForm({ ...form, name: value })} />

        <FormGroup
          label="Code"
          labelFor="code-input"
          helperText="Enter a room code, or leave empty to join a rnadom room."
        />
        <InputGroup type="text" id="code-input" value={form.code} onValueChange={(value) => setForm({ ...form, code: value })} />
        <Button text="Play" type='submit' />
      </form>
    </Card>
  );
}

/**
 * Pages: 
 *  Home - Enter name, select avatar, select play, enter room code
 *  Room - Canvas, Teams, Players, Chats
 */