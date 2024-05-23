import React from "react";
import { TicketType } from "../../types/types";

const Ticket: React.FC<TicketType> = ({ ticket }) => {
  const creationDate = new Date(ticket.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <tr className="border-b border-gray-300">
      <td className="px-5 py-3">
        <div className="text-sm font-bold text-black">{ticket.name}</div>
      </td>
      <td className="px-5 py-3">
        <div className="text-sm text-black">{ticket.email}</div>
      </td>
      <td className="px-5 py-3">
        <div className="text-sm text-black">{ticket.description}</div>
      </td>
      <td className="px-5 py-3">
        <div className="text-sm text-black">{ticket.status}</div>
      </td>
      <td className="px-5 py-3">
        <div className="text-sm text-black">{creationDate}</div>
      </td>
    </tr>
  );
};

export default Ticket;
