import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Success, UserContext } from "../App";

export const useLogout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    setUser && setUser({});
    navigate("/");
};