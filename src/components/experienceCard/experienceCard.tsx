import React from 'react';
import Image from 'next/image';

type Endorser = {
  name: string;
};

type Experience = {
  id: number;
  company: string;
  title: string;
  date: string;
  responsibilities: string[];
  endorsers?: Endorser[];
};

type Props = {
  experience: Experience;
  index: number;
  dropdownOpen: { [key: string]: boolean };
  toggleDropdown: (id: number) => void
};

const ExperienceCard: React.FC<Props> = ({ experience, index, dropdownOpen, toggleDropdown }) => {
  return (
    <div
      key={index}
      className={`mt-4 text-black ml-4 flex items-start transition-all duration-300 ${
        index % 2 !== 0 ? 'bg-white' : 'bg-gray-50'
      } p-4 rounded-lg shadow-md hover:shadow-lg hover:transform hover:scale-105 cursor-pointer`}
    >
      <div className="bg-[#5086ed] w-5 h-5 rounded-full mr-6 mt-1 animate-pulse"></div>

      <div>
        <div className="flex font-semibold text-lg text-gray-800">
          <p className="text-md">
            <span>{experience.company}</span>
            <span className="mx-[2px]">-</span>
            <span>{experience.title}</span>
          </p>
          {experience.endorsers && experience.endorsers.length > 0 && (
            <div className="relative">
              <div
                className="ml-8 py-2 px-4 bg-[#C0DDEC] rounded-full flex items-center cursor-pointer"
                onClick={() => toggleDropdown(experience.id)}
              >
                <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
                <span className="text-sm text-black">Endorsed</span>
              </div>
              {dropdownOpen[experience.id] && (
                <div className="absolute p-2 w-48 bg-white border rounded-md shadow-lg ml-10 z-10">
                  <ul>
                    {experience.endorsers.map((endorser, idx) => (
                      <li
                        key={idx}
                        className="py-1 px-2 text-sm text-gray-800 hover:bg-gray-100 rounded cursor-pointer"
                      >
                        {endorser.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{experience.date}</p>
        <ul className="list-disc ml-6 text-sm text-gray-700 mt-2">
          {experience.responsibilities.map((responsibility, idx) => (
            <li key={idx}>{responsibility}</li>
          ))}
        </ul>
        <div className="h-[2px] bg-gray-300 w-full mt-4"></div>
      </div>
    </div>
  );
};

export default ExperienceCard;
