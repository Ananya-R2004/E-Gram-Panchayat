import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface SkillCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export default function SkillCard({ title, description, icon: Icon, link }: SkillCardProps) {
  return (
    <Card className="p-6 hover-elevate active-elevate-2 transition-all h-full flex flex-col">
      <div className="flex-1">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="font-serif font-semibold text-xl text-card-foreground mb-2" data-testid={`text-skill-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        data-testid={`link-skill-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="mt-4"
      >
        <Button variant="outline" className="w-full">
          Learn More
        </Button>
      </a>
    </Card>
  );
}
