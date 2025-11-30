import { BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ClassCardProps {
  classNumber: number;
  link: string;
}

export default function ClassCard({ classNumber, link }: ClassCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-testid={`link-class-${classNumber}`}
      className="block"
    >
      <Card className="p-6 text-center hover-elevate active-elevate-2 transition-all cursor-pointer group">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg text-card-foreground" data-testid={`text-class-${classNumber}`}>
              Class {classNumber}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Click to access</p>
          </div>
        </div>
      </Card>
    </a>
  );
}
