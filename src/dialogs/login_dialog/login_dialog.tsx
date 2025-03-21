// import { useState, useEffect } from "react";
// import { signInWithGoogle } from "../firebase";
// import { logoutUser } from "../utils/Auth";

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
}
// interface User {
//     displayName: string;
//     email: string;
//     photoURL?: string;
// }


function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
    // const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));

    //     }
    // }, []);
    // console.log('User: ', user);

    // const handleLogin = async () => {
    //     try {
    //         const loggedInUser = await signInWithGoogle();

    //         if (loggedInUser && loggedInUser.email) {
    //             if (!loggedInUser.email.endsWith("@paragoniu.edu.kh")) {
    //                 alert("Only Paragon IU emails are allowed!");
    //                 await logoutUser();
    //                 return;
    //             }

    //             const formattedUser: User = {
    //                 displayName: loggedInUser.displayName || "Unknown User",
    //                 email: loggedInUser.email,
    //                 photoURL: loggedInUser.photoURL || "",
    //             };

    //             setUser(formattedUser);
    //             localStorage.setItem("user", JSON.stringify(formattedUser));
    //             onClose();
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 500);
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         alert("Failed to login. Please try again.");
    //     }
    // };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 text-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-center">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Login to Create Your Portfolio</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="h-[1px] w-full bg-gray-200 mt-2"></div>
                <div
                    // onClick={handleLogin}
                    className="mt-4 w-full bg-white border border-gray-400 p-2 rounded-md flex justify-center items-center hover:bg-gray-100 cursor-pointer"
                >
                    <h5 className="mr-4">Login using your Google Mail</h5>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}


export default LoginDialog;