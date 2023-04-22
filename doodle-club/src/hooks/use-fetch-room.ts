import { useEffect, useState } from "react"
import { MockRooms } from "../mocks/mocks";
import { RoomType } from "../types/RoomType"

export const useFetchRoom = (id: string) => {
    const [room, setRoom] = useState<RoomType>()

    /* TODO: server implementation
    useEffect(() => {
        // fetch from server 
    });
    */

    useEffect(() => {
        const selectedRoom = MockRooms.find((room) => room._id === id);
        if(selectedRoom)
            setRoom(selectedRoom);
    }, [id])

    return { room: room }
}