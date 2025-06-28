import React from 'react';
import Image from 'next/image';

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-serif">Welcome to Gentle Soul Caregiving</h1>
        <p className="mt-4 font-sans">Providing compassionate in-home care for your loved ones.</p>
        <Image
          src="/placeholder.svg"
          alt="Placeholder Image"
          width={200}
          height={150}
          priority
          className="mt-8 mx-auto"
        />
      </div>
    </main>
  );
};

export default HomePage;
