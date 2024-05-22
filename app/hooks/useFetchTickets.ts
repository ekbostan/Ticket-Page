import { useState, useEffect } from 'react';

interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
  created_at: string;
}

interface FetchTicketsResult {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const useFetchTickets = (url: string): FetchTicketsResult => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError((err as Error).message);  // Handle unknown error type
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { tickets, isLoading, error, setTickets };
}

export default useFetchTickets;
