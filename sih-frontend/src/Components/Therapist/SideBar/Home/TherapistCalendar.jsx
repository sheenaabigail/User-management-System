import { useState } from 'react';
// import Calendar from 'react-calendar';
import { Calendar } from "@/Components/ui/calendar";
import { Card } from '@/Components/ui/card';

function TherapistCalendar() {
  const [value, setValue] = useState(new Date());

  return (
    <Card className="bg-gray-100 p-4 rounded-md"> {/* Set background to light grey */}
      <Calendar
        mode="single"
        selected={value}
        onSelect={setValue}
        className="rounded-md border w-full max-w-xs bg-white" 
      />
    </Card>
  );
}

export default TherapistCalendar;
