import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  required = false,
  placeholder = '',
  value,
  onChange,
}) => {
  return (
    <div className="mb-2">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
        {required && <span className="text-red-400 ml-2">*</span>}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
