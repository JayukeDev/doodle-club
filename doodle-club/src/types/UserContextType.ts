import { User } from "./UserType";

export interface UserContextType {
    user?: User;
    setUser?: React.Dispatch<React.SetStateAction<User | undefined>>
}