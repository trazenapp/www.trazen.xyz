import { useMemo } from 'react';

export function useFormattedDate(dateString: string) {
  
  const formattedDate = useMemo(() => {
    if (!dateString) {
      return null;
    }

    const date = new Date(`${dateString}T00:00:00`);

    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string provided to useFormattedDate: ${dateString}`);
      return "Invalid Date";
    }

    const day = date.getDate(); 
    const month = date.toLocaleString('en-US', { month: 'short' }); 
    const year = date.getFullYear(); 

    return `${day} ${month}, ${year}`;

  }, [dateString]); 

  return formattedDate;
}