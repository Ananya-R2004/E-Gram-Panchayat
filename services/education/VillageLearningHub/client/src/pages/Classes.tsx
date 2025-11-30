import ClassCard from '@/components/ClassCard';
import { classData } from '@/data/learning';
import { BookOpen } from 'lucide-react';

export default function Classes() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8" data-testid="header-classes">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground" data-testid="text-page-title">
              School Curriculum Resources
            </h1>
            <p className="text-muted-foreground mt-1">
              Classes 1st to 12th
            </p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Access free NCERT textbooks and digital learning materials for all classes. Click on any class to view the complete curriculum and learning resources.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {classData.map((classItem) => (
          <ClassCard
            key={classItem.number}
            classNumber={classItem.number}
            link={classItem.link}
          />
        ))}
      </div>
    </div>
  );
}
