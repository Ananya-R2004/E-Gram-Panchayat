import { Card } from "@/components/ui/card";
import { Users, Target, Shield, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Active Members", value: "10,000+" },
  { icon: Target, label: "Services Delivered", value: "50,000+" },
  { icon: Shield, label: "Secure Transactions", value: "100%" },
  { icon: Award, label: "Satisfaction Rate", value: "95%" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About E-Gram Panchayat
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Bridging the digital divide and bringing transparent, efficient governance to rural communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-foreground/90 mb-4">
              E-Gram Panchayat is dedicated to empowering rural communities by providing digital access to essential government services, fostering transparency, and enabling active citizen participation in local governance.
            </p>
            <p className="text-foreground/90 mb-4">
              Through our platform, villagers can access education resources, healthcare information, agricultural support, government schemes, and report issues directly to their local panchayat officials.
            </p>
            <p className="text-foreground/90">
              We believe in building stronger, more connected communities where every voice is heard and every citizen has equal access to opportunities and services.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-primary text-primary-foreground">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Our Vision
            </h3>
            <p className="text-primary-foreground/90">
              To create a digitally empowered rural India where every village has access to modern governance tools, fostering sustainable development, social inclusion, and economic prosperity for all community members.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
