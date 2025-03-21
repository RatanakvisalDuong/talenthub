// import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

// export default function SearchBar() {
//     return (
//         <div>
//             <div className="flex justify-center">
//                 <div className="relative w-full">
//                     <input
//                         type="text"
//                         placeholder="Search Portfolio..."
//                         className="w-full h-10 rounded-lg pl-4 pr-4 text-gray-500 bg-white shadow-sm"
//                     />
//                     <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
//                 </div>
//             </div>
//         </div>
//     );
// }

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

export default function SearchBar({ onSearch }: { onSearch: (term: string) => void }) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search Portfolio..."
                        className="w-full h-10 rounded-lg pl-4 pr-4 text-gray-500 bg-white shadow-sm"
                        onChange={handleChange} 
                    />
                    <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 absolute top-1/2 right-3 transform -translate-y-1/2" />
                </div>
            </div>
        </div>
    );
}
