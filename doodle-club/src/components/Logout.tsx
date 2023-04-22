import { FC } from "react";
import { useLogout } from "../hooks/use-logout";

export const Logout: FC = () => {
    useLogout();
    return (<></>);
}