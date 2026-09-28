import { useState } from 'react'
import { UserButton } from '@clerk/react'
import { ArrowRight, Check, CircleHelp, Sparkles } from '../components/Icons'
import AppHeader from '../components/AppHeader'
import { companions, type CompanionId } from '../data/companions'

export default function CharacterPickerPage({ onContinue }: { onContinue: (id: CompanionId) => void }) {
  const [selected, setSelected] = useState<CompanionId | null>(null)

  return (
    <main className="onboarding-page">
      <AppHeader><span className="step-label">STEP 1 OF 2</span><UserButton /></AppHeader>
      <section className="picker-content">
        <div className="eyebrow"><Sparkles size={14} /> YOUR LEARNING JOURNEY</div>
        <h1>Choose your<br /><span>learning companion.</span></h1>
        <p className="intro-copy">Every great journey is better with a guide. Pick the personality you would like by your side.</p>

        <div className="companion-grid" role="radiogroup" aria-label="Choose a learning companion">
          {companions.map((companion) => {
            const isSelected = selected === companion.id
            return (
              <button
                className={`companion-card ${companion.color}${isSelected ? ' selected' : ''}`}
                key={companion.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(companion.id)}
              >
                <span className="selection-check">{isSelected && <Check size={15} strokeWidth={3} />}</span>
                <span className="companion-art"><span>{companion.emoji}</span><i><Sparkles size={13} /></i></span>
                <span className="companion-name">{companion.name}</span>
                <span className="companion-title">{companion.title}</span>
                <span className="companion-note">{companion.note}</span>
              </button>
            )
          })}
        </div>

        <div className="picker-actions">
          <span className="selection-hint">{selected ? `${companions.find(({ id }) => id === selected)?.name} is ready to learn with you.` : 'You can change your companion anytime.'}</span>
          <button className="primary-button" disabled={!selected} onClick={() => selected && onContinue(selected)}>
            Continue <ArrowRight size={17} />
          </button>
        </div>
        <div className="privacy-note"><CircleHelp size={14} /> Your companion is just for fun and can be changed later.</div>
      </section>
      <footer className="app-footer">Small steps. Big ideas. Your pace.</footer>
    </main>
  )
}
