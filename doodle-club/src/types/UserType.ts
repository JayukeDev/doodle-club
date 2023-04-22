import { RoomType } from "./RoomType";

export interface UserType {
    _id?: string;
    name?: string;
    
    currentRoom?: RoomType;
}