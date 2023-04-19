import { UserType } from "./UserType";

export interface UserContextType {
    user?: UserType;
    setUser?: React.Dispatch<React.SetStateAction<UserType | undefined>>
}