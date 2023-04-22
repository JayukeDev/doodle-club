import { useState } from "react";
import { MockRooms } from "../mocks/mocks";
import { RoomType } from "../types/RoomType"

export const useFetchRooms = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);

    /* TODO: server implementation
    useEffect(() => {
        // fetch data from server
    })
    */

    return { rooms: MockRooms };
}