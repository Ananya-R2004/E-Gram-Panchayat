import SkillCard from '@/components/SkillCard';
import { skillsData } from '@/data/learning';
import { Award } from 'lucide-react';

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8" data-testid="header-skills">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center">
            <Award className="w-7 h-7 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-3xl md:text-4xl text-foreground" data-testid="text-page-title">
              Real-World Skills
            </h1>
            <p className="text-muted-foreground mt-1">
              Build practical abilities for life and career
            </p>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          Develop essential skills that will help you succeed beyond the classroom. From financial literacy to digital skills, these resources are designed to prepare you for the real world.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill) => (
          <SkillCard
            key={skill.title}
            title={skill.title}
            description={skill.description}
            icon={skill.icon}
            link={skill.link}
          />
        ))}
      </div>
    </div>
  );
}
