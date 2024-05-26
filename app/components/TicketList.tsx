import React from "react";
import { Ticket } from "../../types/types";
import { getStatusStyles, formatDate, formatStatus  } from "../utils/ticketUtils";

interface TicketListProps {
  tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="px-4 py-4 sm:px-6 cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {ticket.name}
              </p>
              <div className="ml-2 flex-shrink-0 flex">
              <span
                className="inline-block px-2 py-1 rounded"
                style={getStatusStyles(ticket.status)}
              >
                {formatStatus(ticket.status)}
              </span>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  {ticket.email}
                </p>
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                {formatDate(ticket.created_at)}
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <p className="flex items-center text-sm text-gray-500">
                {ticket.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
