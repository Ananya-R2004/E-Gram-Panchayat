import ClassCard from '@/components/ClassCard';
import SkillCard from '@/components/SkillCard';
import CareerCard from '@/components/CareerCard';
import BambooDivider from '@/components/BambooDivider';
import { Sprout, DollarSign, MessageCircle, Laptop, Lightbulb, Leaf, Wrench, Stethoscope, GraduationCap, BarChart, Briefcase } from 'lucide-react';

const classData = [
  { number: 1, link: 'https://ncert.nic.in/textbook.php?aemh1=0-16' },
  { number: 2, link: 'https://ncert.nic.in/textbook.php?bemh1=0-18' },
  { number: 3, link: 'https://ncert.nic.in/textbook.php?cemh1=0-18' },
  { number: 4, link: 'https://ncert.nic.in/textbook.php?demh1=0-18' },
  { number: 5, link: 'https://ncert.nic.in/textbook.php?eemh1=0-18' },
  { number: 6, link: 'https://ncert.nic.in/textbook.php?femh1=0-22' },
  { number: 7, link: 'https://ncert.nic.in/textbook.php?gemh1=0-22' },
  { number: 8, link: 'https://ncert.nic.in/textbook.php?hemh1=0-22' },
  { number: 9, link: 'https://ncert.nic.in/textbook.php?iemh1=0-22' },
  { number: 10, link: 'https://ncert.nic.in/textbook.php?jemh1=0-22' },
  { number: 11, link: 'https://ncert.nic.in/textbook.php?kemh1=0-40' },
  { number: 12, link: 'https://ncert.nic.in/textbook.php?lemh1=0-40' },
];

const skillsData = [
  {
    title: 'Financial Basics',
    description: 'Learn essential money management, savings, and banking skills for everyday life',
    icon: DollarSign,
    link: 'https://rbi.org.in/financialeducation/home.aspx',
  },
  {
    title: 'Communication & English',
    description: 'Improve your speaking, listening, and writing skills with free interactive lessons',
    icon: MessageCircle,
    link: 'https://www.bbc.co.uk/learningenglish',
  },
  {
    title: 'Digital Literacy',
    description: 'Master essential computer and internet skills to thrive in the digital world',
    icon: Laptop,
    link: 'https://learndigital.withgoogle.com/digitalgarage',
  },
  {
    title: 'Entrepreneurship',
    description: 'Discover how to start and grow your own business with practical guidance',
    icon: Lightbulb,
    link: 'https://www.skillindiadigital.gov.in',
  },
  {
    title: 'Agriculture Basics',
    description: 'Modern farming techniques and agricultural knowledge for rural youth',
    icon: Leaf,
    link: 'https://krishijagran.com/education',
  },
];

const careerData = [
  { title: 'Engineer', icon: Wrench, link: 'https://www.ncs.gov.in/career-guidance/Pages/Engineering.aspx' },
  { title: 'Doctor', icon: Stethoscope, link: 'https://www.ncs.gov.in/career-guidance/Pages/Medical.aspx' },
  { title: 'Teacher', icon: GraduationCap, link: 'https://www.ncs.gov.in/career-guidance/Pages/Teaching.aspx' },
  { title: 'Data Analyst', icon: BarChart, link: 'https://www.skillindiadigital.gov.in' },
  { title: 'Government Jobs', icon: Briefcase, link: 'https://www.ncs.gov.in' },
];

export default function LearningHub() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <header className="text-center mb-16" data-testid="header-learning-hub">
          <div className="flex justify-center mb-6">
            <Sprout className="w-16 h-16 text-primary" />
          </div>
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-foreground mb-4" data-testid="text-main-title">
            Village Learning Hub
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-subtitle">
            Your free gateway to learning, skills, and careers — built for every village learner.
          </p>
        </header>

        <BambooDivider />

        <section className="mb-20" data-testid="section-technical-learning">
          <h2 className="font-serif font-semibold text-3xl text-foreground text-center mb-4" data-testid="text-technical-heading">
            School Curriculum Resources (1st to 12th)
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Access free NCERT textbooks and digital learning materials for all classes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {classData.map((classItem) => (
              <ClassCard
                key={classItem.number}
                classNumber={classItem.number}
                link={classItem.link}
              />
            ))}
          </div>
        </section>

        <BambooDivider />

        <section className="mb-20" data-testid="section-skill-growth">
          <h2 className="font-serif font-semibold text-3xl text-foreground text-center mb-4" data-testid="text-skills-heading">
            Real-World Skills for Every Student
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Build practical skills that will help you succeed in life and career
          </p>
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
        </section>

        <BambooDivider />

        <section className="mb-16" data-testid="section-career-roadmaps">
          <h2 className="font-serif font-semibold text-3xl text-foreground text-center mb-4" data-testid="text-careers-heading">
            Find Your Future Path
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Explore different career opportunities and discover what's right for you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {careerData.map((career) => (
              <CareerCard
                key={career.title}
                title={career.title}
                icon={career.icon}
                link={career.link}
              />
            ))}
          </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-border text-center" data-testid="footer-learning-hub">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>Powered by E-Gram Panchayat | Building Smarter Villages Together</span>
            <Sprout className="w-4 h-4 text-primary" />
          </div>
        </footer>
      </div>
    </div>
  );
}
