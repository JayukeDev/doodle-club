
import { Button, Card, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { CSSProperties, useContext, useState } from 'react';
import { LocalColors } from '../constants/LocalColors';
import { UserContext } from './_app';

export default function Home() {
  const router = useRouter();
  const { updateUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: "", code: "" });
  const existingRooms = ["1234", "abcd"];

  async function handleSubmit(event) {
    event.preventDefault();
    const { name, code } = form

    if (code && !existingRooms.find(entry => entry === form.code))
      return alert(`No room with code ${form.code} found.`);

    const finalCode = code || "random";
    console.log(finalCode);
    updateUser(name, finalCode);
    await router.push(`/rooms/${finalCode}`);
  }

  const LoginCardStyle: CSSProperties = {
    backgroundColor: LocalColors.Green,
    height: '200px',
    width: '300px',
    padding: '10%',
    margin: 'auto',
    marginTop: '100px',
    textAlign: 'center'
  }

  return (
    <Card elevation={Elevation.TWO} style={LoginCardStyle}>
      <h1>Your mom</h1>
      <form onSubmit={handleSubmit} style={{ margin: 'auto' }}>
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