import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
});

/** Current time in Surat (IST), refreshed every 15s. */
export function useLocalTime() {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(fmt.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}
