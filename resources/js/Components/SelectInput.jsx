// ...

const SelectInput = ({ options, className = '', value, onChange, ...props }) => {
  return (
    <div>
      <select
        {...props}
        value={value}  // Asegúrate de que esté usando el prop value
        onChange={(e) => onChange(e.target.value)}  // Asegúrate de pasar el valor seleccionado al onChange
        className={
          'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
          className
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
