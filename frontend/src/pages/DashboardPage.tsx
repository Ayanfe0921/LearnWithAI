import { useState } from 'react'
import { UserButton, useUser } from '@clerk/react'
import { BookOpen, ChevronRight, Flame, GraduationCap, Sparkles, Target } from '../components/Icons'
import DailyQuote from '../components/DailyQuote'
import CourseCatalogPage from './CourseCatalogPage'
import FirstCourseCard from '../components/FirstCourseCard'
import LearningStatCard from '../components/LearningStatCard'
import Sidebar, { type DashboardSection } from '../components/Sidebar'
import { companions, type CompanionId } from '../data/companions'

export default function DashboardPage({ companionId, onChangeCompanion }: { companionId: CompanionId; onChangeCompanion: () => void }) {
  const { user } = useUser()
  const [section, setSection] = useState<DashboardSection>('home')
  const companion = companions.find(({ id }) => id === companionId) ?? companions[0]
  const firstName = user?.firstName || user?.username || 'Learner'
  const title = section === 'home' ? 'Overview' : section === 'courses' ? 'Courses' : 'My progress'

  return (
    <div className="dashboard-shell">
      <Sidebar companionId={companionId} section={section} onChangeCompanion={onChangeCompanion} onSectionChange={setSection} />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> {title}</div>
          <div className="header-right"><span className="header-date">Your personal learning space</span><UserButton /></div>
        </header>

        <div className="dashboard-content">
          {section === 'courses' ? <CourseCatalogPage /> : <>
          <section className="welcome-banner">
            <div className="welcome-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE</div>
              <h1>{section === 'home' ? `Good to have you here, ${firstName}.` : 'Your progress, at a glance.'}</h1>
              <p>{section === 'home' ? 'What would you like to learn today? We will help you find a good place to start.' : 'Every session is a step forward. Your milestones will show up here.'}</p>
            </div>
            <div className={`welcome-mascot ${companion.color}`}><span>{companion.emoji}</span><i><Sparkles size={16} /></i></div>
          </section>

          <section className="stats-grid" aria-label="Learning stats">
            <LearningStatCard icon={<Flame size={19} />} tone="cyan" label="LEARNING STREAK" value="0" unit="days" description="Start a learning session today" />
            <LearningStatCard icon={<BookOpen size={19} />} tone="blue" label="COURSES IN PROGRESS" value="0" description="Your learning paths appear here" />
            <LearningStatCard icon={<Target size={19} />} tone="gold" label="LEARNING GOAL" value="Set one" description="Choose what you want to learn next" />
          </section>

          <FirstCourseCard onExplore={() => setSection('courses')} />

          <div className="bottom-row">
            <section className="empty-panel">
              <div className="panel-heading">
                <div><span className="panel-kicker">PICK UP WHERE YOU LEFT OFF</span><h3>Continue learning</h3></div>
                <button className="text-button" onClick={() => setSection('courses')}>View all <BookOpen size={15} /></button>
              </div>
              <div className="empty-state"><span className="empty-icon"><GraduationCap size={23} /></span><p>Your first course will appear here.</p></div>
            </section>
            <DailyQuote />
          </div>
          <div className="dashboard-footer">Made for curious minds <span>&#x2726;</span></div>
          </>}
        </div>
      </main>
    </div>
  )
}
