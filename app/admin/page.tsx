"use client"
import React from 'react';
import useFetchTickets from '../hooks/useFetchTickets';
import TicketList from "../components/AdminTicketList"
import { useRouter } from 'next/navigation';

const AdminPanel: React.FC = () => {
  const { tickets, isLoading, error } = useFetchTickets('/api/tickets/get');
    const router = useRouter();

  const handleTicketClick = (ticketId: number) => {
    router.push(`/admin/${ticketId}`);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-black font-bold mb-4">Admin Panel</h1>
        {isLoading ? (
          <p>Loading tickets...</p>
        ) : error ? (
          <p className="text-red-500">Error loading tickets: {error}</p>
        ) : (
          <TicketList tickets={tickets} onTicketClick={handleTicketClick} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
