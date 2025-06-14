import { useMemo, useRef, useState } from "react";
import TextInput from "../textinput/textInput";
import EndorserInput from "../endorsementInput/endorsementInput";
import Image from "next/image";
import axios from "axios";

export default function BecomeEndorser({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [position, setPosition] = useState("");
    const [company, setCompany] = useState("");
    const [students, setStudents] = useState<string[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const handleStudentChanges = (students: string[]) => {
        setStudents(students);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        setImageFile(files[0]);
        event.target.value = "";
    };

    const imagePreview = useMemo(() => {
        return imageFile ? URL.createObjectURL(imageFile) : null;
    }, [imageFile]);

    const becomeEndorser = async () => {
        if (!name || !email || !contact || !position || !company || students.length === 0) {
            setError("Please fill in all required fields.");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            setError("Name can only contain letters and spaces.");
            return;
        }
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!imageFile) {
            setError("Please upload your working identification image.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("working_position", position);
        formData.append("company", company);
        formData.append("image", imageFile);

        for (var i = 0; i < students.length; i++) {
            formData.append("student_name[]", students[i]);
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}become_endorser`, formData);

            if (response.status === 200) {
                // Show success message for 2.5 seconds
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    onClose();
                }, 2500);
            } else {
                setError("Failed to submit your application. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            setError("An error occurred while submitting your application. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {loading ? (
                <div className={`bg-white rounded-xl p-6 w-[800px] max-w-full shadow-lg h-[610px] z-50 relative overflow-y-auto flex justify-center items-center`}>
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500"></div>
                </div>
            ) : showSuccess ? (
                <div className={`bg-white rounded-xl p-6 w-[800px] max-w-full shadow-lg h-[610px] z-50 relative overflow-y-auto flex flex-col justify-center items-center`}>
                    <div className="text-center">
                        <div className="mb-4">
                            <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-green-600 mb-2">Application Submitted Successfully!</h3>
                        <p className="text-gray-600">Thank you for your endorser application. We will review it and contact you soon.</p>
                    </div>
                </div>
            ) : (
                <div className={`bg-white rounded-xl p-6 w-[850px] max-w-full shadow-lg h-[610px] z-50 relative overflow-y-auto`}>
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

                            <div className="flex items-center p-1 mb-2 bg-yellow-50 rounded-lg border border-yellow-300">
                                <svg className="w-3 h-3 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p className="text-xs text-yellow-500">
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

                            <EndorserInput
                                title="Name of Students"
                                label="Students You Want to Endorse"
                                existingEndorsers={students}
                                onEndorserChange={(handleStudentChanges)}
                                placeholder="Eg.Ratanakisal Duong, Chanphearun Cheam, & Lysa Sorkeo"
                            />

                            {error && (
                                <div className="text-red-500 text-sm ">
                                    {error}
                                </div>
                            )}
                        </form>
                        <div className="w-2/5">
                            <label className="block text-sm font-medium text-black mb-1">Upload Certificate Image<span className="text-red-600 ml-2">*</span></label>
                            <button
                                type="button"
                                onClick={handleImageClick}
                                className="px-4 py-2 bg-[#EFEFEF] rounded hover:bg-black mb-2 text-black w-full hover:text-white"
                            >
                                {imageFile ? "Change Image" : "Upload Image"}
                            </button>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                            />
                            <div className="flex items-start p-1 mb-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                <svg className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div className="text-xs text-yellow-500">
                                    <p>Please upload something to show your working identification.</p>
                                </div>
                            </div>

                            {imagePreview && (
                                <div className="mt-2 relative">
                                    <Image
                                        src={imagePreview}
                                        alt="Certificate Image"
                                        width={300}
                                        height={300}
                                        className="object-contain rounded shadow mx-auto"
                                        unoptimized
                                    />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={becomeEndorser}
                            type="submit"
                            className="ml-auto text-white bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 hover:cursor-pointer "
                        >
                            Submit Application
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}