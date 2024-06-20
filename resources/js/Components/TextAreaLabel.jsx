import React, { useState } from 'react';

const TextAreaLabel = ({ label, className = '', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="">
      <label
        className={`text-sm font-medium text-gray-700 ${isFocused ? 'transform -translate-y-3' : ''}`}
      >
        {label}
      </label>
      <textarea
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm p-2 ' +
          className
        }
      />
    </div>
  );
};

export default TextAreaLabel;
