import { useEffect, useState, type FormEvent } from 'react'
import { useUser } from '@clerk/react'
import { Check, CreditCard, UserRound } from '../components/Icons'

export default function ProfilePage({ onOpenBilling }: { onOpenBilling: () => void }) {
  const { user, isLoaded } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!user) return
    setFirstName(user.firstName ?? '')
    setLastName(user.lastName ?? '')
  }, [user?.id, user?.firstName, user?.lastName])

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user) return
    setIsSaving(true)
    setMessage('')
    try {
      await user.update({ firstName: firstName.trim(), lastName: lastName.trim() })
      setMessage('Your profile has been updated.')
    } catch {
      setMessage('We could not save your name. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isLoaded) return <section className="profile-page"><div className="catalog-empty"><span className="loader" /><h3>Loading your profile</h3></div></section>

  return (
    <section className="profile-page">
      <div className="page-intro"><span className="panel-kicker">YOUR ACCOUNT</span><h1>Profile</h1><p>Manage your name and learning account.</p></div>
      <div className="profile-layout">
        <section className="profile-card">
          <div className="profile-card-heading"><span className="profile-avatar">{user?.imageUrl ? <img src={user.imageUrl} alt="" /> : <UserRound size={24} />}</span><div><h2>{user?.fullName || user?.username || 'Your profile'}</h2><p>{user?.primaryEmailAddress?.emailAddress}</p></div></div>
          <form className="profile-form" onSubmit={saveProfile}>
            <label>First name<input value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" /></label>
            <label>Last name<input value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" /></label>
            {message && <p className="profile-message" role="status">{message}</p>}
            <button className="primary-button" disabled={isSaving}>{isSaving ? 'Saving…' : 'Save profile'}</button>
          </form>
        </section>
        <section className="subscription-card"><span className="subscription-icon"><CreditCard size={20} /></span><span className="panel-kicker">COURSE PAYMENTS</span><h2>Buy courses individually</h2><p>Each one-time course payment unlocks its lessons and checkpoint. Your progress is saved to your account.</p><div className="subscription-features"><span><Check size={15} /> Card checkout</span><span><Check size={15} /> Full course access</span><span><Check size={15} /> Certificate eligibility</span></div><button className="secondary-button" onClick={onOpenBilling}>View payment details</button></section>
      </div>
    </section>
  )
}
