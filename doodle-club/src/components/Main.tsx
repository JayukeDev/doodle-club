import { Alignment, Colors, Navbar } from "@blueprintjs/core";
import { FC, useContext, useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import Logo from '../assets/Logo.png';
import { Lobby } from "../pages/Lobby";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Room } from "../pages/Room";
import { Logout } from "./Logout";

export const Main: FC = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!user?._id && location.pathname !== "/")
            navigate("/");
        
        if(user?._id && location.pathname === "/")
            navigate("lobby");
    }, [location, user])
    
    return (
        <div className="App" style={{ background: Colors.DARK_GRAY3 }}>
            <Navbar style={{background: Colors.DARK_GRAY4}}>
                <Navbar.Group align={Alignment.LEFT}>
                    {<img width="20%" src={Logo} alt="Doodle Club Logo" onClick={() => navigate("/")}/>}
                    <Navbar.Divider />
                    <Link to="logout">Logout</Link>
                </Navbar.Group>
            </Navbar>
            <Routes>
                <Route path="lobby" element={<Lobby />} />
                <Route path="room" element={<Room settings={user?.currentRoom} />} />
                <Route path="logout" element={<Logout />} />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}