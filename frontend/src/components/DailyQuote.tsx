import { Sparkles } from './Icons'

export default function DailyQuote() {
  return (
    <section className="daily-card">
      <span className="daily-icon"><Sparkles size={18} /></span>
      <span className="panel-kicker">A NOTE FOR TODAY</span>
      <p>"The beautiful thing about learning is that nobody can take it away from you."</p>
      <small>— B.B. King</small>
    </section>
  )
}
