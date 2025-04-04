import { Endorser } from "@/app/type/endorser";
import { useState, useEffect } from "react";

interface EndorserInputProps {
  onEndorserChange: (endorsers: string[]) => void;
  existingEndorsers: string[];
}

const EndorserInput: React.FC<EndorserInputProps> = ({ onEndorserChange, existingEndorsers }) => {
  const [endorserInput, setEndorserInput] = useState("");
  const [endorsers, setEndorsers] = useState<string[]>(existingEndorsers);

  useEffect(() => {
    setEndorsers(existingEndorsers);
  }, [existingEndorsers]);

  const handleAddEndorser = (email: string) => {
    if (!endorsers.includes(email)) {
      const newEndorsers = [...endorsers, email];
      setEndorsers(newEndorsers);
      onEndorserChange(newEndorsers); 
    }
    setEndorserInput("");
  };

  const handleRemoveEndorser = (email: string) => {
    const newEndorsers = endorsers.filter((e) => e !== email);
    setEndorsers(newEndorsers);
    onEndorserChange(newEndorsers); 
  };

  const handleEndorserKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && endorserInput.trim()) {
      e.preventDefault();
      handleAddEndorser(endorserInput.trim());
    }
  };

  return (
    <div className="mb-2 relative">
      <h1 className="text-black text-lg font-bold">
        Endorsement
      </h1>
      <div className="h-[2px] w-24 bg-gray-200 mb-2">
      </div>
      <label htmlFor="endorser" className="block text-sm font-medium text-black">
        Endorser
      </label>

      <input
        type="text"
        id="endorser"
        value={endorserInput}
        onChange={(e) => setEndorserInput(e.target.value)}
        onKeyDown={handleEndorserKeyDown}
        className="w-full px-3 py-2 border border-gray-300 rounded-md text-black text-sm"
        placeholder="Eg. rduong1@paragoniu.edu.kh"
        autoComplete="off"
      />

      {endorserInput.trim() && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
          <li
            onClick={() => handleAddEndorser(endorserInput.trim())}
            className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-black"
          >
            {endorserInput.trim()}
          </li>
        </ul>
      )}

      {/* Display selected endorsers */}
      {endorsers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {endorsers.map((email, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs flex items-center gap-1"
            >
              {email}
              <button
                type="button"
                onClick={() => handleRemoveEndorser(email)}
                className="text-green-600 hover:text-red-500"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default EndorserInput;
