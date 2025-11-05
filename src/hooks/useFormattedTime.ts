import { useMemo } from 'react';

export function useFormattedTime(timeString: string | null | undefined) {
  
  const formattedTime = useMemo(() => {
    if (!timeString) {
      return null;
    }

    const date = new Date(`1970-01-01T${timeString}`);

    if (isNaN(date.getTime())) {
      console.warn(`Invalid time string provided to useFormattedTime: ${timeString}`);
      return "Invalid Time";
    }

    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',    
      minute: '2-digit',  
      hour12: true        
    };

    return date.toLocaleString('en-US', options);

  }, [timeString]); 

  return formattedTime;
}