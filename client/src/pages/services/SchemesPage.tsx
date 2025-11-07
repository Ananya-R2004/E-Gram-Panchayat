// client/src/pages/services/SchemesPage.tsx
import React from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function SchemesPage() {
  return (
    <>
      <Navbar />
      <div className="pt-20 p-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Schemes & Policies</h1>
        <p className="text-lg text-muted-foreground">
          Welcome to the Schemes & Policies module. This content has been successfully routed!
        </p>
        <a href="/services" className="text-primary hover:underline block mt-4">Back to Services</a>
      </div>
    </>
  );
}