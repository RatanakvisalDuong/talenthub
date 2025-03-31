import React from 'react';
import Image from 'next/image';

interface Certificate{
  id: number;
  name: string;
  issuedDate: string;
  image: string;

};

export default function CertificateCard({ certificate, onClick}: { certificate: Certificate; onClick: () => void }) {
  return (
    <div
      key={certificate.id}
      className="bg-white w-full h-50 shadow-md mt-4 px-4 py-2 rounded-md cursor-pointer hover:transform hover:scale-105"
      onClick={onClick}
    >
      <div className="flex w-full justify-between">
        <div className="w-[70%] overflow-hidden">
          <p className="text-sm text-black">{certificate.name}</p>
        </div>
        <div className="w-[30%] flex justify-end">
          <Image src="/verified.png" alt="Verified" width={20} height={20} className="mr-2" />
        </div>
      </div>
      <p className="text-[12px] text-[#808080] mt-1">Issued Date: {certificate.issuedDate}</p>
      <Image
        src={certificate.image}
        alt="Certificate"
        width={200}
        height={200}
        className="object-cover mt-2"
      />
    </div>
  );
};
