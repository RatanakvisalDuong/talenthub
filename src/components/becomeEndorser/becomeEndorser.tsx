import { useState } from "react";
import TextInput from "../textinput/textInput";

export default function BecomeEndorser({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {loading ? (
                <div className={`bg-white rounded-xl p-6 w-[800px] max-w-full shadow-lg h-[650px] z-50 relative overflow-y-auto flex justify-center items-center`}>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500"></div>
                </div>
            ) : <div className={`bg-white rounded-xl p-6 w-[850px] max-w-full shadow-lg h-[600px] z-50 relative overflow-y-auto`}>
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-black">Become Endorser Application</h2>
                    <button onClick={onClose} className="text-black cursor-pointer hover:text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="h-[2px] w-24 bg-gray-200 mb-2" />

                <div className="flex gap-x-6">
                    {/* Left side: Form */}
                    <form className="w-3/5">
                        <TextInput
                            id="name"
                            label="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Eg.Ratanakvisal Duong"
                        />

                        <TextInput
                            id="contact"
                            label="Contact"
                            required
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Eg.017614694"
                        />

                        <TextInput
                            id="email"
                            label="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Eg.rduong1@paragoniu.edu.kh"
                        />

                        <div className="flex items-center p-3 mb-4 bg-blue-50 rounded-lg border border-blue-100">
                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-sm text-blue-700">
                                Please input your email address carefully, as we will use it to contact you regarding your application.
                            </p>
                        </div>
                        <TextInput
                            id="position"
                            label="Position You Are Working"
                            required
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Eg.Software Engineer"
                        />

                        <TextInput
                            id="company"
                            label="Company Your Work For"
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Eg.Paragon International University"
                        />

                        {error && (
                            <div className="text-red-500 text-sm ">
                                {error}
                            </div>
                        )}
                    </form>

                    {/* Right side: Multiple Image Upload
                    <div className="w-2/5">
                        <label className="block text-sm font-medium text-black mb-1">Upload Images</label>
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="px-4 py-2 bg-[#EFEFEF] rounded hover:bg-black mb-2 text-black w-full hover:text-white"
                        >
                            Upload Images
                        </button>

                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />

                        {imagePreviews.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative">
                                        <Image
                                            src={src}
                                            alt={`Selected ${index + 1}`}
                                            width={96}
                                            height={96}
                                            className="object-cover rounded shadow"
                                            unoptimized
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                                            title="Remove image"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div> */}
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer "
                        // onClick={handleAddProject}
                    >
                        Create Project
                    </button>
                </div>
            </div>
            }
        </div>
    );
}