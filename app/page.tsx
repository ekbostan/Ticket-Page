"use client";
import React, { useState } from "react";
import useFetchTickets from "./hooks/useFetchTickets";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import { useRouter } from "next/navigation";
import { Ticket } from "../types/types";

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { tickets, isLoading, error, setTickets } =
    useFetchTickets("/api/tickets/get");
  const router = useRouter();

  const handleClose = () => {
    setShowForm(false);
  };

  const handleAddTicket = (ticket: Ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  };
  const goToAdminPage = () => {
    router.push("/admin");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8 flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-4"
        >
          {showForm ? "Close Form" : "Add New Ticket"}
        </button>
        <button
          onClick={goToAdminPage}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Admin Page
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
          <TicketForm onClose={handleClose} onAddTicket={handleAddTicket} />
        </div>
      )}

      {isLoading ? (
        <p>Loading tickets...</p>
      ) : error ? (
        <p className="text-red-500">Error loading tickets: {error}</p>
      ) : (
        <TicketList tickets={tickets} />
      )}
    </div>
  );
};

export default Home;
