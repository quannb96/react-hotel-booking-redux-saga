import React, { useContext } from "react";
import * as RiIcons from "react-icons/ri";
import { CustomerContext } from "../../../providers/CustomerContext";
import { v4 } from "uuid";

function RoomSelect({ option }) {
  const { customerBook, setCustomerBook, options, setOptions } =
    useContext(CustomerContext);

  const handleRemoveRoomBook = (id) => {
    const filterOption = options.filter((option) => option.id !== id);
    setOptions(filterOption);
    if (options.length === 0) {
      setOptions({
        id: v4(),
        adult: 2,
        children: 0,
        roomName: "",
        roomPrice: 0,
      });
    }
  };

  return (
    <div className="room-select">
      <div className="flex">
        <div className="booking-heading-room">{option.roomName}</div>
        <span onClick={() => handleRemoveRoomBook(option.id)}>
          <RiIcons.RiDeleteBinLine />
        </span>
      </div>
      <div className="flex">
        <div>
          <p>
            {option.adult + option.children} guests {customerBook.nights} night
          </p>
          <p>Non-refundable</p>
        </div>
        <span className="room-select-price">
          VND{" "}
          {String(
            parseFloat(option.roomPrice).toFixed(2) * customerBook.nights
          ).replace(/(.)(?=(\d{3})+$)/g, "$1,")}
        </span>
      </div>
    </div>
  );
}

export default RoomSelect;
