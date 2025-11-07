import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer"; // Assuming Footer is here as well
import { Link } from "wouter";

// Helper component for service cards (based on your screenshot)
const ServiceCard = ({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) => (
  <Link href={href}>
    <a className="flex flex-col items-center p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
      <div className="text-4xl text-green-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </a>
  </Link>
);

const ServicesPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-6 md:p-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Our Comprehensive Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering rural communities through digital governance and access to essential resources.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="Education"
            description="Access educational resources, scholarships, and learning programs for all ages."
            icon={
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M22 10v6M14 6L6 2 2 4v2l4 2 8 4-8 4v2l4-2 6-3 4 2V8z"/><polyline points="6 2 2 4 2 6"/><polyline points="2 18 6 16 14 20"/></svg>
            }
            href="/services/education"
          />
          <ServiceCard
            title="Healthcare"
            description="Find health centers, medical camps, and wellness programs in your area."
            icon={
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 21.36v-6.66l1.379-3.714 2.604 6.495 2.5-5.5H22"/></svg>
            }
            href="/services/healthcare"
          />
          <ServiceCard
            title="Agriculture"
            description="Get farming tips, weather updates, market prices, and agricultural schemes."
            icon={
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shovel"><path d="M2 22v-5l5-5 5 5-5 5H2z"/><path d="M17 2l5 5-10 10-5-5 10-10z"/></svg>
            }
            href="/services/agriculture"
          />
          <ServiceCard
            title="Schemes & Policies"
            description="Learn about government schemes, eligibility criteria, and apply for benefits online."
            icon={
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text"><path d="M8 21h8"/><path d="M12 21v-8"/><path d="M16 3H8a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/><path d="M10 9h4"/></svg>
            }
            href="/services/schemes"
          />
          <ServiceCard
            title="Issue Reporting"
            description="Report problems, track complaints, and get resolutions from your local panchayat."
            icon={
                <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-siren"><path d="M7 12a5 5 0 0 1 5-5 5 5 0 0 1 5 5"/><path d="M22 14H2"/><path d="M12 14V7"/><path d="M18.42 16.61a2 2 0 0 0-.25 2.11l.86 1.15a1 1 0 0 1-.92 1.48H4.89a1 1 0 0 1-.92-1.48l.86-1.15a2 2 0 0 0-.25-2.11l-2.02-3a2 2 0 0 1 .53-2.61L4 9a2 2 0 0 1 1.77-.92H18.23a2 2 0 0 1 1.77.92L20 11a2 2 0 0 1 .53 2.61z"/></svg>
            }
            href="/services/issue-reporting"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;