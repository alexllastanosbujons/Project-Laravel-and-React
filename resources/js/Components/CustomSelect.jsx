import React, { useState } from 'react';

const CustomSelect = ({ options, onChange, value }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-md p-2 w-48 focus:outline-none focus:border-indigo-500"
      />
      <select
        value={value}
        onChange={(e) => {
          console.log('Selected value:', e.target.value);
          onChange(e.target.value);
        }}
        className="m-2 border rounded-md p-2 w-48 focus:outline-none focus:border-indigo-500"
      >
        {/* Opción por defecto */}
        <option value="" disabled hidden>
          Selecciona una opción
        </option>

        {filteredOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
