import { Card } from "@/components/ui/card";
import { GraduationCap, Heart, Sprout, FileText, AlertCircle } from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Access educational resources, scholarships, and learning programs for students of all ages.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Heart,
    title: "Healthcare",
    description: "Find health centers, medical camps, and wellness programs available in your area.",
    color: "text-red-600 dark:text-red-400",
  },
  {
    icon: Sprout,
    title: "Agriculture",
    description: "Get farming tips, weather updates, market prices, and agricultural schemes information.",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: FileText,
    title: "Schemes & Policies",
    description: "Learn about government schemes, eligibility criteria, and apply for benefits online.",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    icon: AlertCircle,
    title: "Issue Reporting",
    description: "Report problems, track complaints, and get resolutions from your local panchayat.",
    color: "text-orange-600 dark:text-orange-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital services designed to meet the needs of rural communities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="p-6 hover-elevate cursor-pointer transition-all"
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <service.icon className={`h-12 w-12 mb-4 ${service.color}`} />
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
