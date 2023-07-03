import { createContext } from 'react'
import { ITeam } from '../pages/Home'

interface TeamsContext {
    teams: ITeam[]
    getChildrenTeams: (teamId: string) => void
}

export const TeamsContext = createContext<TeamsContext>({
    teams: [],
    getChildrenTeams: () => null,
})
