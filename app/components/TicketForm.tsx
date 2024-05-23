import React, { useState, FormEvent } from "react";

// Define the Ticket interface for type safety
interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
  created_at: string;
}

interface TicketFormProps {
  onClose: () => void;
  onAddTicket: (ticket: Ticket) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onClose, onAddTicket }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Validate the email format
  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Check that the name is not just whitespace
  function isValidName(name: string): boolean {
    return name.trim() !== '';
  }

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email) || !isValidName(name)) {
      setError("Please enter a valid name and email.");
      return;
    }

    const ticketDetails = { name, email, description };
    const response = await fetch("/api/tickets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketDetails),
    });

    if (response.ok) {
      const newTicketData = await response.json(); 
      const newTicket: Ticket = {
        ...newTicketData,
        name,
        email,
        description,
        created_at: new Date().toISOString()
      };
      onAddTicket(newTicket); 
      setName('');
      setEmail('');
      setDescription('');
      setError('');
      onClose();
    } else {
      setError("Failed to submit ticket. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose} 
    >
      <form
        onClick={(e) => e.stopPropagation()} 
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl bg-white p-10 border border-gray-300 rounded-lg shadow-lg space-y-6"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg p-1"
          aria-label="Close form"
          style={{ fontSize: '1.5rem' }} 
        >
          &#x2715;
        </button>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Submit a Support Ticket
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              className="mt-1 block w-1/2 px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              className="mt-1 block w-1/2 px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Problem Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your issue"
              required
              className="mt-1 block w-full h-32 px-4 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-1/2 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;
