import { Bot } from './Icons'

export default function Brand() {
  return (
    <a className="brand" href="/" aria-label="LearnWithAI home">
      <span className="brand-bot-icon" aria-hidden="true"><Bot size={23} strokeWidth={2.1} /></span>
      <span className="brand-lockup">
        <span className="brand-name">LearnWith<span>AI</span></span>
        <span className="brand-tagline">Empowering Future Intelligence</span>
      </span>
    </a>
  )
}
