import React from "react";
import Header from "../components/Header"; 
import bgImage from "../assets/village-bg.jpg"; 

export default function Home() {
    return (
        <div>
            {/* Hero Section */}
            <div
                id="hero"
                className="relative min-h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 flex flex-col min-h-screen">
                    <Header />

                    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16">
                        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
                            Empowering Villages through Digital Governance
                        </h1>
                        <p className="text-lg max-w-2xl mb-12 text-gray-100">
                            e-Gram Panchayat brings transparency and convenience by providing easy access
                            to services, records, and village meetings online.
                        </p>

                        <div className="mt-8 flex gap-8 flex-wrap justify-center">
                            <div className="bg-white/90 shadow-lg p-6 rounded-lg w-80">
                                <h3 className="font-bold mb-2 text-lg text-green-900">📢 Announcements</h3>
                                <ul className="list-disc list-inside text-left text-gray-800">
                                    <li>Village meeting scheduled on 15th September</li>
                                    <li>New water supply project approved</li>
                                    <li>Scholarship applications open for students</li>
                                </ul>
                            </div>

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

            {/* About Section */}
            <section id="about" className="py-20 bg-gray-100 text-center">
                <h2 className="text-4xl font-bold mb-6 text-green-900">About E-Gram Panchayat</h2>
                <p className="max-w-4xl mx-auto text-gray-700 text-lg mb-6 px-4">
                    <strong>E-Gram Panchayat</strong> is an all-in-one digital platform aimed at empowering rural communities
                    by transforming local governance through technology. It streamlines communication between
                    citizens and panchayat officials, making essential services more accessible, transparent, and efficient.
                </p>

                <p className="max-w-3xl mx-auto text-gray-700 mb-8 px-4">
                    Our platform provides centralized access to crucial sectors for rural development:
                </p>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left px-6">
                    <div className="bg-green-50 shadow-md rounded-lg p-6 flex items-start gap-4">
                        <span className="text-3xl">🎓</span>
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">Education</h3>
                            <p>Information on local schools, scholarships, and digital learning support.</p>
                        </div>
                    </div>
                    <div className="bg-green-50 shadow-md rounded-lg p-6 flex items-start gap-4">
                        <span className="text-3xl">🌱</span>
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">Agriculture</h3>
                            <p>Guidance for farmers, crop updates, government schemes, and subsidies.</p>
                        </div>
                    </div>
                    <div className="bg-green-50 shadow-md rounded-lg p-6 flex items-start gap-4">
                        <span className="text-3xl">🏥</span>
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">Healthcare</h3>
                            <p>Local health center info, awareness drives, and health scheme details.</p>
                        </div>
                    </div>
                    <div className="bg-green-50 shadow-md rounded-lg p-6 flex items-start gap-4">
                        <span className="text-3xl">📜</span>
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">Government Schemes</h3>
                            <p>Easy access to the latest government benefits and policies.</p>
                        </div>
                    </div>
                    <div className="bg-green-50 shadow-md rounded-lg p-6 flex items-start gap-4 md:col-span-2">
                        <span className="text-3xl">📢</span>
                        <div>
                            <h3 className="font-bold text-green-800 mb-1">Public Issue Reporting</h3>
                            <p>A system to raise and track common village issues and grievances.</p>
                        </div>
                    </div>
                </div>

                <p className="max-w-3xl mx-auto text-gray-700 text-lg mt-10 px-4">
                    With E-Gram Panchayat, we envision a smarter, more connected rural India where governance is inclusive,
                    services are accessible, and communities are actively involved in their development.
                </p>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-white text-center">
                <h2 className="text-4xl font-bold mb-6 text-green-900">Contact Us</h2>
                <p className="mb-8 text-gray-700">Reach us anytime through the following team contacts:</p>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <div className="bg-green-50 p-6 rounded shadow flex flex-col items-center">
                        <h3 className="font-bold text-green-800 mb-2">Akshay Gowda S</h3>
                        <a href="mailto:1am23cd007@amceducation.in" className="text-gray-800 mb-4">1am23cd007@amceducation.in</a>
                        <button
                            onClick={() => window.location.href = "mailto:1am23cd007@amceducation.in"}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Send Email
                        </button>
                    </div>

                    <div className="bg-green-50 p-6 rounded shadow flex flex-col items-center">
                        <h3 className="font-bold text-green-800 mb-2">Abhini S</h3>
                        <a href="mailto:1am23cd003@amceducation.in" className="text-gray-800 mb-4">1am23cd003@amceducation.in</a>
                        <button
                            onClick={() => window.location.href = "mailto:1am23cd003@amceducation.in"}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Send Email
                        </button>
                    </div>

                    <div className="bg-green-50 p-6 rounded shadow flex flex-col items-center">
                        <h3 className="font-bold text-green-800 mb-2">Ananya R</h3>
                        <a href="mailto:1am23cd011@amceducation.in" className="text-gray-800 mb-4">1am23cd011@amceducation.in</a>
                        <button
                            onClick={() => window.location.href = "mailto:1am23cd011@amceducation.in"}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Send Email
                        </button>
                    </div>

                    <div className="bg-green-50 p-6 rounded shadow flex flex-col items-center">
                        <h3 className="font-bold text-green-800 mb-2">G R Alok Kumar</h3>
                        <a href="mailto:1am23cd035@amceducation.in" className="text-gray-800 mb-4">1am23cd035@amceducation.in</a>
                        <button
                            onClick={() => window.location.href = "mailto:1am23cd035@amceducation.in"}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        >
                            Send Email
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
