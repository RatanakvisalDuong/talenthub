import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await signIn('google', { redirect: false });
    if (result?.error) {
      setErrorMessage('Sign-in failed. Please ensure you are using your organization email.');
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-black bg-black/50">
      <div className="fixed inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] text-center relative">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Login to Create Your Portfolio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-600 cursor-pointer" disabled={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-200 mt-2"></div>

        <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md border border-blue-200">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Important</span>
          </div>
          <p className="text-sm text-left">
            Please use your <span className="font-bold">Paragon International University </span>email to login.
            Personal email domains (gmail.com, yahoo.com, etc.) are not permitted unless you have requested to be an endorser.
          </p>
        </div>

        {errorMessage && (
          <div className="text-red-500 mt-3 p-2 bg-red-50 rounded-md border border-red-200">
            {errorMessage}
          </div>
        )}

        <button
          onClick={handleSignIn}
          className="mt-4 w-full bg-white border border-gray-400 p-2 rounded-md flex justify-center items-center hover:bg-gray-100 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
              <span>Redirecting to Google...</span>
            </div>
          ) : (
            <>
              <h5 className="mr-4">Login using your Organization Email</h5>
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default LoginDialog;