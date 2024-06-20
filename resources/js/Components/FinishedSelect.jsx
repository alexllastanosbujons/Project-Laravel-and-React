import React from 'react';

const FinishedSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="bg-white border border-gray-300 p-2 rounded-md"
    >
      <option value="0">Not Finished</option>
      <option value="1">Finished</option>
    </select>
  );
};

export default FinishedSelect;