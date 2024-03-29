
import { Button, Card, Divider, Elevation, FormGroup, InputGroup } from '@blueprintjs/core';
import { useRouter } from 'next/router';
import { CSSProperties, useContext, useState } from 'react';
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
    width: '500px',
    height: '370px',
    background: `linear-gradient(0deg, rgba(115,111,164,1) 60%, rgba(115,111,100,1) 98%, rgba(115,111,100,1) 99%)`,
    margin: 'auto',
    marginTop: '100px',
    textAlign: 'center',
    color: 'white',
    textShadow: '-.4px 0 pink, 0 1px black, .5px 0 lightblue, 0 -1px black',
  }

  return (
    <Card elevation={Elevation.FOUR} style={LoginCardStyle}>
      <h1>DRAWING GAME</h1>
      <form onSubmit={handleSubmit} style={{ position: 'relative', bottom: 0, fontSize: 'large' }}>
        <FormGroup
          label="Name"
          labelFor="name-input"
          inline
        />
        <InputGroup
          type="text"
          id="name-input"
          value={form.name}
          onValueChange={(value) => setForm({ ...form, name: value })} />
        <Divider />
        <FormGroup
          inline
          label="Code"
          labelFor="code-input"
        />
        <InputGroup
          type="text"
          id="code-input"
          value={form.code}
          onValueChange={(value) => setForm({ ...form, code: value })} />

        <Button text="Play" large type='submit' style={{
          color: 'white',
          backgroundColor: 'green', 
          marginTop: '40px',
          width: '200px',
          }} />
      </form>
    </Card>
  );
}