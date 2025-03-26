'use client';

// import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
//   const searchParams = useSearchParams();
//   const error = searchParams.get('error');

//   let errorMessage = "An authentication error occurred";
//   let errorDescription = "Please try again or contact support if the problem persists.";
  
//   if (error === "BlockedDomain") {
//     errorMessage = "Organization Email Required";
//     errorDescription = "Please sign in with your organization email. Personal email domains like Gmail, Yahoo, etc. are not allowed.";
//   }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex items-center mb-4 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <h1 className="text-2xl font-bold">ad</h1>
        </div>
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md text-gray-700">
          {/* {errorDescription} */}
		  as
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}