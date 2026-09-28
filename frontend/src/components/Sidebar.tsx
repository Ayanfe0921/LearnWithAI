import { BookOpen, ChevronRight, LayoutDashboard, Sparkles, Trophy } from './Icons'
import Brand from './Brand'
import type { CompanionId } from '../data/companions'
import { companions } from '../data/companions'

export type DashboardSection = 'home' | 'courses' | 'progress'

export default function Sidebar({
  companionId,
  section,
  onChangeCompanion,
  onSectionChange,
}: {
  companionId: CompanionId
  section: DashboardSection
  onChangeCompanion: () => void
  onSectionChange: (section: DashboardSection) => void
}) {
  const companion = companions.find(({ id }) => id === companionId) ?? companions[0]

  return (
    <aside className="sidebar">
      <Brand />
      <div className="side-label">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        <button className={section === 'home' ? 'active' : ''} onClick={() => onSectionChange('home')}><LayoutDashboard size={18} /> Overview</button>
        <button className={section === 'courses' ? 'active' : ''} onClick={() => onSectionChange('courses')}><BookOpen size={18} /> Courses</button>
        <button className={section === 'progress' ? 'active' : ''} onClick={() => onSectionChange('progress')}><Trophy size={18} /> My progress</button>
      </nav>
      <div className="sidebar-bottom">
        <div className="companion-mini">
          <span className={`mini-avatar ${companion.color}`}>{companion.emoji}</span>
          <span><strong>Learning with {companion.name}</strong><small>{companion.title}</small></span>
          <button title="Change companion" onClick={onChangeCompanion}><ChevronRight size={16} /></button>
        </div>
        <div className="sidebar-tip"><Sparkles size={16} /><p>A little learning each day adds up to a lot.</p></div>
      </div>
    </aside>
  )
}
