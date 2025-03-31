import React from 'react';

interface BigTextInputProps {
    id: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const BigTextInput: React.FC<BigTextInputProps> = ({
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
            <textarea
                id={id}
                typeof='text'
                value={value}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black h-20 text-sm resize-none"
                onChange={onChange}
                autoComplete="off"
                required={required}
            />
        </div>
    );
};

export default BigTextInput;
