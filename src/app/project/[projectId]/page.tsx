import Appbar from "@/components/appbar/appbar";

export default function ProjectPage() {
    return (
        <div className={`bg-[#E8E8E8] w-screen h-screen overflow-hidden`}>

            <Appbar />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-20 flex justify-between">
                <div className="flex justify-between w-full">
                    <div className="h-[85vh] w-[66%] flex flex-col justify-between overflow-y-auto">
                        <div className="h-[55%] w-full bg-[#F5F5F5] p-4">
                            <div className="w-full flex justify-between items-center">
                                <p className="text-xl font-bold text-black">
                                    TalentHub Project
                                </p>
                                <div className="flex items-center justify-center">
                                    <div className="flex h-[30px] items-center justify-center mr-4">
                                        <p className="text-black font-bold text-md mr-2">
                                            Public
                                        </p>
                                        <label className="relative inline-flex cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>

                                    <button
                                        className="text-sm text-white hover:underline cursor-pointer py-2 px-4 bg-[#ffc107] rounded-md items-center justify-center"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div className="h-[40%] w-full bg-[#F5F5F5]" >

                        </div>
                    </div>

                    <div className="h-[85vh] w-[30%] flex flex-col justify-between overflow-y-auto bg-black">

                    </div>


                </div>
            </div>
        </div>
    );
}