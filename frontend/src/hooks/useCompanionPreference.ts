import { useEffect, useState } from 'react'
import { useUser } from '@clerk/react'
import { companions, type CompanionId } from '../data/companions'

export function useCompanionPreference() {
  const { user, isLoaded } = useUser()
  const storageKey = user ? `learnwithai:companion:${user.id}` : null
  const [companionId, setCompanionId] = useState<CompanionId | null>(null)
  const [isPreferenceLoaded, setIsPreferenceLoaded] = useState(false)

  useEffect(() => {
    setIsPreferenceLoaded(false)
    if (!storageKey) return

    const storedId = window.localStorage.getItem(storageKey) as CompanionId | null
    setCompanionId(companions.some(({ id }) => id === storedId) ? storedId : null)
    setIsPreferenceLoaded(true)
  }, [storageKey])

  function chooseCompanion(id: CompanionId) {
    if (storageKey) window.localStorage.setItem(storageKey, id)
    setCompanionId(id)
  }

  function clearCompanion() {
    if (storageKey) window.localStorage.removeItem(storageKey)
    setCompanionId(null)
  }

  return {
    companionId,
    chooseCompanion,
    clearCompanion,
    isLoading: !isLoaded || !isPreferenceLoaded,
  }
}
