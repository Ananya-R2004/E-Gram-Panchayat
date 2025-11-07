// client/src/pages/services/EducationPage.tsx
import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function EducationPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-green-600">Education Services</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the Education Services module. This content has been successfully routed!
        </p>
        <a href="/services" className="text-primary hover:underline block mt-4">Back to Services</a>
      </div>
    </>
  );
}