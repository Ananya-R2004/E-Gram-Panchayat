import React from "react";
import Header from "../components/Header"; 
import bgImage from "../assets/village-bg.jpg"; 

export default function Home() {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Page content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                <Header /> {/* This is the key change */}

                {/* Hero Section */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                    <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
                        Empowering Villages through Digital Governance
                    </h1>
                    <p className="text-lg max-w-2xl mb-12 text-gray-100">
                        e-Gram Panchayat brings transparency and convenience by providing easy access
                        to services, records, and village meetings online.
                    </p>

                    {/* Info Sections */}
                    <div className="mt-8 flex gap-8 flex-wrap justify-center">
                        {/* Announcements */}
                        <div className="bg-white/90 shadow-lg p-6 rounded-lg w-80">
                            <h3 className="font-bold mb-2 text-lg text-green-900">📢 Announcements</h3>
                            <ul className="list-disc list-inside text-left text-gray-800">
                                <li>Village meeting scheduled on 15th September</li>
                                <li>New water supply project approved</li>
                                <li>Scholarship applications open for students</li>
                            </ul>
                        </div>

                        {/* Meeting */}
                        <div className="bg-white/90 shadow-lg p-6 rounded-lg w-80 text-center">
                            <h3 className="font-bold mb-2 text-lg text-green-900">💻 Village Meeting</h3>
                            <p className="text-gray-800">Join live meetings with Panchayat members.</p>
                            <button
                                onClick={() => window.open("https://zoom.us/", "_blank")}
                                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                            >
                                Join Meeting
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}