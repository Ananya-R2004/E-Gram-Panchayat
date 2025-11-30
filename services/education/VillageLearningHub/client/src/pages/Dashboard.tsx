import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Award, Compass, Sprout, ArrowRight } from 'lucide-react';
import BambooDivider from '@/components/BambooDivider';

const sections = [
  {
    title: 'School Curriculum',
    description: 'Access NCERT textbooks and digital learning materials for classes 1-12',
    icon: BookOpen,
    link: '/classes',
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Skill Development',
    description: 'Build practical real-world skills in finance, communication, digital literacy, and more',
    icon: Award,
    link: '/skills',
    color: 'bg-accent text-accent-foreground',
  },
  {
    title: 'Career Roadmaps',
    description: 'Explore different career paths and discover opportunities for your future',
    icon: Compass,
    link: '/careers',
    color: 'bg-secondary text-secondary-foreground',
  },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-12" data-testid="header-dashboard">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <Sprout className="w-12 h-12 text-primary" />
          </div>
        </div>
        <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-4" data-testid="text-main-title">
          Village Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-subtitle">
          Your free gateway to learning, skills, and careers — built for every village learner.
        </p>
      </div>

      <BambooDivider />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sections.map((section) => (
          <Card key={section.title} className="p-8 hover-elevate active-elevate-2 transition-all">
            <div className={`w-16 h-16 rounded-lg ${section.color} flex items-center justify-center mb-4`}>
              <section.icon className="w-8 h-8" />
            </div>
            <h2 className="font-serif font-semibold text-2xl text-card-foreground mb-3" data-testid={`text-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
              {section.title}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {section.description}
            </p>
            <Link href={section.link}>
              <Button variant="outline" className="w-full group" data-testid={`link-section-${section.title.toLowerCase().replace(/\s+/g, '-')}`}>
                Explore
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="font-serif font-semibold text-xl text-foreground mb-2">
              Welcome to Your Learning Journey
            </h3>
            <p className="text-muted-foreground">
              Select a section from the sidebar or choose one of the options above to begin exploring educational resources, developing new skills, or planning your career path.
            </p>
          </div>
          <div className="flex gap-2">
            <Sprout className="w-12 h-12 text-primary opacity-50" />
          </div>
        </div>
      </Card>
    </div>
  );
}
