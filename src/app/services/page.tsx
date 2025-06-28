import React from 'react';

const ServicesPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Our Services</h1>
        <ul className="mt-4 list-disc pl-5">
          <li>Companion Care</li>
          <li>Respite Care</li>
          <li>Personal Care</li>
        </ul>
      </div>
    </main>
  );
};

export default ServicesPage;
