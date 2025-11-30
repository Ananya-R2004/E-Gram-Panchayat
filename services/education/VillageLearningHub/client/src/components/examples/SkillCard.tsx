import SkillCard from '../SkillCard'
import { DollarSign } from 'lucide-react'

export default function SkillCardExample() {
  return (
    <SkillCard
      title="Financial Basics"
      description="Learn essential money management skills and financial literacy"
      icon={DollarSign}
      link="https://rbi.org.in"
    />
  )
}
