import React, { useState } from 'react';

const TableComponent = ({ data, fieldsToShow, onRowSelect, onRowDoubleClick, messageNull, hideSearchBar }) => {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">{messageNull ? messageNull : "No hay datos para mostrar."}</p>;
  }

  const headers = Object.keys(data[0]).filter((key) => fieldsToShow.includes(key));

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRowClick = (id, name) => {
    if (selectedRow === id) {
      setSelectedRow(null);
      onRowSelect(null, null);
    } else {
      setSelectedRow(id);
      onRowSelect(id, name);
    }
  };

  const handleDoubleClick = (id) => {
    onRowDoubleClick(id);
  };

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div>
      {!hideSearchBar && (
        <div className="mb-4 flex items-center justify-center">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-2 border border-gray-300 rounded-md mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {capitalizeFirstLetter(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(row.id, row.name)}
              onDoubleClick={() => handleDoubleClick(row.id)}
              className={`cursor-pointer ${selectedRow === row.id ? 'bg-gray-200' : ''}`}
            >
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
