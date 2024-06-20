import React, { useState } from 'react';
import DateSelector from './DateSelector';

const Date = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Select a date:</h1>
      <DateSelector selectedDate={selectedDate} onDateChange={handleDateChange} />

      {selectedDate && <p>Selected Date: {selectedDate.toISOString().split('T')[0]}</p>}
    </div>
  );
};

export default App;
