export interface Ticket {
    id: number;
    name: string;
    email: string;
    description: string;
    status: string;
    created_at: string;
  }
 export interface TicketType {
    ticket: {
        id: number;
        name: string;
        email: string;
        description: string;
        status: string;
        created_at: string;
    };
}
  export interface TicketListProps {
    tickets: Ticket[];
    onTicketClick: (ticketId: number) => void;
  }
  
  export interface FetchTicketsResult {
    tickets: Ticket[];
    isLoading: boolean;
    error: string | null;
    setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  }
  
  export interface TicketFormProps {
    onClose: () => void;
    onAddTicket: (ticket: Ticket) => void;
  }