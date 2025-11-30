import { DollarSign, MessageCircle, Laptop, Lightbulb, Leaf, Wrench, Stethoscope, GraduationCap, BarChart, Briefcase, LucideIcon } from 'lucide-react';

export interface ClassItem {
  number: number;
  link: string;
}

export interface SkillItem {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
}

export interface CareerItem {
  title: string;
  icon: LucideIcon;
  link: string;
}

export const classData: ClassItem[] = [
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

export const skillsData: SkillItem[] = [
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

export const careerData: CareerItem[] = [
  { title: 'Engineer', icon: Wrench, link: 'https://www.ncs.gov.in/career-guidance/Pages/Engineering.aspx' },
  { title: 'Doctor', icon: Stethoscope, link: 'https://www.ncs.gov.in/career-guidance/Pages/Medical.aspx' },
  { title: 'Teacher', icon: GraduationCap, link: 'https://www.ncs.gov.in/career-guidance/Pages/Teaching.aspx' },
  { title: 'Data Analyst', icon: BarChart, link: 'https://www.skillindiadigital.gov.in' },
  { title: 'Government Jobs', icon: Briefcase, link: 'https://www.ncs.gov.in' },
];
