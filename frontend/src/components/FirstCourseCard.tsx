import { ArrowRight, BookOpen, Clock3, Compass, Plus } from './Icons'

export default function FirstCourseCard({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="start-card">
      <div className="start-illustration">
        <div className="book-stack"><BookOpen size={40} strokeWidth={1.5} /></div>
        <span className="float-star star-one">&#x2726;</span>
        <span className="float-star star-two">&#x2727;</span>
        <span className="float-dot" />
      </div>
      <div className="start-copy">
        <div className="eyebrow"><Compass size={14} /> YOUR FIRST LEARNING PATH</div>
        <h2>Curiosity looks good on you.</h2>
        <p>Pick a topic you have been curious about. Your learning workspace is ready for the next step.</p>
        <button className="primary-button" onClick={onExplore}><Plus size={17} /> Explore my learning <ArrowRight size={16} /></button>
      </div>
      <div className="start-side-note"><Clock3 size={15} /> Learn at your own pace</div>
    </section>
  )
}
