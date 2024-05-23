import React from "react";
import { Ticket } from "../../types/types";

interface TicketListProps {
  tickets: Ticket[];
}
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

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
                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {ticket.status}
                </p>
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
