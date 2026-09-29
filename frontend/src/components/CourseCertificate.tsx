import { useUser } from '@clerk/react'
import { Printer, Sparkles } from './Icons'

export default function CourseCertificate({ courseTitle, completedAt }: { courseTitle: string; completedAt: string }) {
  const { user } = useUser()
  const fullName = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'Learner'
  const completionDate = new Date(completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className="certificate-section" aria-label="Course completion certificate">
      <div className="certificate-heading"><div><span className="panel-kicker">COURSE COMPLETE</span><h2>Your certificate is ready</h2></div><Sparkles size={20} /></div>
      <article className="course-certificate">
        <img className="certificate-background" src="/logo1.jpeg" alt="" />
        <div className="certificate-content">
          <span className="certificate-brand"><span className="certificate-brand-icon">✦</span> LearnWithAI</span>
          <span className="certificate-eyebrow">CERTIFICATE OF COMPLETION</span>
          <span className="certificate-caption">This certificate is proudly presented to</span>
          <h3 className="certificate-learner">{fullName}</h3>
          <span className="certificate-caption">for successfully completing the course</span>
          <h4 className="certificate-course-title">{courseTitle}</h4>
          <span className="certificate-date">Completed on {completionDate}</span>
          <span className="certificate-signature">LearnWithAI Learning Team</span>
        </div>
      </article>
      <div className="certificate-actions"><p>Print or save this certificate as a PDF.</p><button className="primary-button" onClick={() => window.print()}><Printer size={16} /> Print certificate</button></div>
    </section>
  )
}
