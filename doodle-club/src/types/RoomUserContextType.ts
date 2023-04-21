import { Team } from "./TeamType";
import { UserType } from "./UserType";

export interface RoomUserContextType extends UserType {
    team?: Partial<Team>
}