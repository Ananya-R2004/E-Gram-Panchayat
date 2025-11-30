import CareerCard from '../CareerCard'
import { Stethoscope } from 'lucide-react'

export default function CareerCardExample() {
  return (
    <CareerCard
      title="Doctor"
      icon={Stethoscope}
      link="https://www.ncs.gov.in"
    />
  )
}
