export const fetchTicket = async (id: string) => {
    const response = await fetch(`/api/tickets/getById?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };
  