import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomAction } from "../../../stores/slices/roomsSlice";
import "../style/room-list.scss";
import "antd/dist/antd.css";
import RoomItem from "./RoomItem";
import { CustomerContext } from "../../../providers/CustomerContext";

function RoomListStart({ sumPerson, idOption }) {
  const roomState = useSelector((state) => state.room.roomState);
  const dispatch = useDispatch();
  const roomList = roomState?.data;

  useEffect(() => {
    dispatch(fetchRoomAction());
  }, []);

  let filterRoom = roomList.filter((room) => room.maxPerson >= sumPerson);

  return (
    <div className="rooms">
      {filterRoom.map((room) => (
        <div key={room.id} className="room">
          <RoomItem room={room} idOption={idOption} />
        </div>
      ))}
    </div>
  );
}

export default RoomListStart;
