export const fetchTicket = async (id: string) => {
    const response = await fetch(`/api/ticket?id=${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  };
  
  export const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending":
        return { backgroundColor: '#e5e7eb', color: '#374151' }; 
      case "resolved":
        return { backgroundColor: '#86efac', color: '#065f46' }; 
      case "in progress":
        return { backgroundColor: '#6b7280', color: '#f3f4f6' }; 
      default:
        return { backgroundColor: '#e5e7eb', color: '#4b5563' }; 
    }
  };
  
  
  export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }