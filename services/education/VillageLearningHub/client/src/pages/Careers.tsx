import CareerCard from '@/components/CareerCard';
import { careerData } from '@/data/learning';
import { Compass } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function Careers() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8" data-testid="header-careers">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center">
            <Compass className="w-7 h-7 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground" data-testid="text-page-title">
              Career Roadmaps
            </h1>
            <p className="text-muted-foreground mt-1">
              Find your future path
            </p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Explore different career opportunities and discover what's right for you. Each path includes guidance, resources, and steps to help you achieve your goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {careerData.map((career) => (
          <CareerCard
            key={career.title}
            title={career.title}
            icon={career.icon}
            link={career.link}
          />
        ))}
      </div>

      <Card className="p-6 bg-muted/50">
        <h3 className="font-serif font-semibold text-lg mb-2">Need More Guidance?</h3>
        <p className="text-muted-foreground text-sm">
          Visit the National Career Service portal for comprehensive career counseling, aptitude tests, and personalized guidance from career experts.
        </p>
      </Card>
    </div>
  );
}
