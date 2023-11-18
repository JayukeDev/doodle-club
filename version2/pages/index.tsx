import { Button, Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { CSSProperties, useState } from 'react';
import { LocalColors } from '../constants/LocalColors';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", code: "" });
  const [form, setForm] = useState({ name: "", code: "" });
  const existingRooms = ["1234", "abcd"];

  async function handleSubmit(event) {
    event.preventDefault();

    // if we have no code, join public room

    // verify room with code exists otherwise:
    if (form.code && !existingRooms.find(entry => entry === form.code))
      return alert(`No room with code ${form.code} found.`);

    if (!form.code)
      form.code = "random";

    setUser(form);
    router.push(`/rooms/${form.code}`)
  }

  const LoginCardStyle: CSSProperties = {
    backgroundColor: LocalColors.Green,
    width: '50%',
    padding: '10%',
    margin: 'auto',
    marginTop: '100px',
    textAlign: 'center'
  }

  return (
    <Card elevation={Elevation.TWO} style={LoginCardStyle}>
      <h1>Your mom</h1>
      <form onSubmit={handleSubmit} style={{  margin: 'auto' }}>
        <FormGroup
          label="Name"
          labelFor="name-input"
        />
        <InputGroup
          type="text"
          id="name-input"
          value={form.name}
          onValueChange={(value) => setForm({ ...form, name: value })} />

        <FormGroup
          label="Code"
          labelFor="code-input"
        />
        <InputGroup
          type="text"
          id="code-input"
          value={form.code}
          onValueChange={(value) => setForm({ ...form, code: value })} />

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