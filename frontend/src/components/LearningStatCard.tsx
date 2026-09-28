import type { ReactNode } from 'react'

export default function LearningStatCard({
  icon,
  tone,
  label,
  value,
  unit,
  description,
}: {
  icon: ReactNode
  tone: 'cyan' | 'blue' | 'gold'
  label: string
  value: string
  unit?: string
  description: string
}) {
  return (
    <article className="stat-card">
      <span className={`stat-icon ${tone}`}>{icon}</span>
      <span className="stat-label">{label}</span>
      <strong>{value}{unit && <small> {unit}</small>}</strong>
      <span className="stat-foot">{description}</span>
    </article>
  )
}
