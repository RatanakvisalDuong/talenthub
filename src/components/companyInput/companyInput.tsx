import { useState, useEffect } from "react";
import axios from "axios";

const CompanyInput = ({
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  onInputChange: (newCompany: string) => void;
}) => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false); // Track focus state

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}view_all_companies`);
        setCompanies(response.data);
        setFilteredCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Filter companies based on input value
  useEffect(() => {
    if (inputValue.length > 0) {
      const filtered = companies.filter((company) =>
        company.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]); // Reset to hide the suggestions if input is empty
    }
  }, [inputValue, companies]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onInputChange(value); // Update the input value in the parent component
  };

  // Handle selecting a company from the dropdown
  const handleSelectCompany = (company: string) => {
    onInputChange(company); // Update the selected company in the parent component
    setFilteredCompanies([]); // Clear the suggestions once a company is selected
    setFocused(false); // Remove focus when a company is selected
  };

  // Handle focus and blur events
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  // Prevent blur when clicking on a suggestion
  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent blur on mouse down
  };

  return (
    <div className="mb-2 relative">
      <label htmlFor="company" className="block text-sm font-medium text-black">
        Company <span className="text-red-400 ml-2">*</span>
      </label>
      <input
        id="company"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        placeholder="Type or select a company"
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
      />
      {loading && (
        <div className="absolute top-0 right-0 mt-8 text-sm text-gray-500">
          Loading...
        </div>
      )}
      {focused && inputValue.length > 0 && filteredCompanies.length > 0 && (
        <ul className="mt-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md bg-white shadow-lg absolute w-full z-10 text-black">
          {filteredCompanies.map((company) => (
            <li
              key={company}
              onClick={() => handleSelectCompany(company)}
              onMouseDown={handleMouseDown} // Prevent blur when clicking on a suggestion
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {company}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyInput;
