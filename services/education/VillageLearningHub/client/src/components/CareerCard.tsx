import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface CareerCardProps {
  title: string;
  icon: LucideIcon;
  link: string;
}

export default function CareerCard({ title, icon: Icon, link }: CareerCardProps) {
  return (
    <Card className="p-6 hover-elevate active-elevate-2 transition-all text-center flex flex-col items-center">
      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-accent-foreground" />
      </div>
      <h3 className="font-serif font-semibold text-lg text-card-foreground mb-4" data-testid={`text-career-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </h3>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`link-career-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="w-full"
      >
        <Button variant="default" className="w-full">
          Explore Path
        </Button>
      </a>
    </Card>
  );
}
