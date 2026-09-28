import CharacterPickerPage from '../pages/CharacterPickerPage'
import DashboardPage from '../pages/DashboardPage'
import { useCompanionPreference } from '../hooks/useCompanionPreference'
import type { CompanionId } from '../data/companions'

export default function AuthenticatedApp() {
  const { companionId, chooseCompanion, clearCompanion, isLoading } = useCompanionPreference()

  if (isLoading) {
    return <div className="loading-screen"><span className="loader" /><span>Getting your learning space ready...</span></div>
  }

  if (!companionId) {
    return <CharacterPickerPage onContinue={(id: CompanionId) => chooseCompanion(id)} />
  }

  return <DashboardPage companionId={companionId} onChangeCompanion={clearCompanion} />
}
