import { Card, Colors, Elevation } from "@blueprintjs/core";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { LoginForm } from "../components/LoginForm";

import Logo from '../assets/Logo.png';

export const Login: FC = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    if (user?._id)
        navigate("/Lobby");

    const cardStyle = {
        color: Colors.LIGHT_GRAY3,
        background: Colors.DARK_GRAY4
    }

    return (
        <div className="Login">
            <Card className="LoginCard" elevation={Elevation.TWO} style={cardStyle}>
                <img width="100%" src={Logo} alt="Doodle Club Logo" />
                <LoginForm />
            </Card>
        </div>
    );
}