"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const fetchTicket = async (id: string) => {
  const response = await fetch(`/api/tickets/getById?id=${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

const TicketDetail: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [ticket, setTicket] = useState<any | null>(null);
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('new');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchTicket(id).then(data => {
        setTicket(data);
        setResponse(data.response || '');
        setStatus(data.status || 'new');
      }).catch(err => setError(err.message));
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/respondToTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: ticket.id, response, status }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit response');
      }

      await res.json();
      router.push('/admin');
    } catch (err) {
      // setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-xl leading-6 font-medium text-gray-900">
              Ticket #{ticket.id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {ticket.description}
            </p>
          </div>
          <div className="border-t border-gray-200 bg-gray-50">
            <dl className="divide-y divide-gray-200">
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {ticket.description}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-select mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="new">Pending</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Response</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="form-textarea px-2 py-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                    />
                    <div className="px-4 py-5 sm:px-6 flex justify-end">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded"
                        disabled={loading}
                      >
                        {loading ? 'Submitting...' : 'Submit Response'}
                      </button>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                  </form>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  return <TicketDetail id={params.id} />;
}