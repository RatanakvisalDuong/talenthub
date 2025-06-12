import React from 'react';
import Head from 'next/head';
import Appbar from '../appbar/appbar';

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/talenthublogo-sm.webp" />
        <title>TalentHub</title>
      </Head>
      {/* Desktop/Tablet View (>= 900px) */}
      <div className="hidden min-[900px]:block">
        <Appbar />
        <main>{children}</main>
      </div>

      {/* Mobile View (< 900px) - Restriction Message */}
      <div className="block min-[900px]:hidden min-h-screen flex items-center justify-center p-4 bg-[#E8E8E8]">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Desktop Required
          </h2>
          <p className="text-gray-600 mb-4">
            This application does not work on your device. Please use a desktop or tablet with a screen width of at least 650px.
          </p>
          <div className="text-sm text-gray-500">
            Current screen size is too small
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;