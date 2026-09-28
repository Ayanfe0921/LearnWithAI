import { Show, SignIn, UserButton } from '@clerk/react'

export default function App() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="LearnWithAI home">
          <span className="brand-mark">L</span>
          <span>learnwith<span className="brand-accent">ai</span></span>
        </a>
        <Show when="signed-in"><UserButton /></Show>
      </header>
      <section className="hero">
        <div className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL LEARNING SPACE</div>
        <h1>Make learning<br /><span>feel effortless.</span></h1>
        <p>Turn what you want to learn into a clear, guided path. Your AI study partner is getting ready.</p>
        <Show when="signed-out">
          <div className="sign-in-card">
            <div className="card-heading">Welcome to your next chapter</div>
            <p className="card-copy">Sign in to continue to your learning workspace.</p>
            <SignIn routing="hash" />
          </div>
        </Show>
        <Show when="signed-in">
          <div className="welcome-card"><div className="welcome-icon">✦</div><div><strong>You’re signed in.</strong><p>Your learning workspace is ready to build.</p></div></div>
        </Show>
      </section>
      <footer>Small steps. Big ideas. Your pace.</footer>
    </main>
  )
}
