import React from "react";

interface SelectMonthInputProps {
	label: string;
	id: string;
	required?: boolean;
	onChange: (value: string | null) => void; // Allow null as a valid value
	value?: string | null; // Allow value to be either string or null
}

const SelectMonthInput: React.FC<SelectMonthInputProps> = ({
	label,
	id,
	required = false,
	onChange,
	value = null, // Default value is null
}) => {
	return (
		<div className="mb-2">
			<label htmlFor={id} className="block text-sm font-medium text-black">
				{label}
				{required && <span className="text-red-400 ml-2">*</span>}
			</label>
			<select
				id={id}
				className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
				onChange={(e) => onChange(e.target.value === "" ? null : e.target.value)} // Convert empty string to null
				value={value || ""} // Ensure value is either null or a string, defaulting to ""
			>
				<option value="" disabled>
					Select Month
				</option>
				{[
					"January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December"
				].map((month, index) => (
					<option key={index} value={month}>
						{month}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectMonthInput;
