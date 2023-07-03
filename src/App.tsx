import { useCallback, useEffect, useState } from 'react'
import { TeamsContext } from './context/TeamsContext'
import Home, { ITeam } from './pages/Home'
import { fetchAllTeams, fetchChildrenTeams } from './api/teams'

function App() {
    const [teams, setTeams] = useState<ITeam[]>([])

    useEffect(() => {
        getInitialTeams()
    }, [])

    const getInitialTeams = useCallback(async () => {
        const { data } = await fetchAllTeams()
        if (data) {
            const filtered = data.filter(
                ({ parentTeam }) => parentTeam === null
            )
            setTeams(filtered)
        }
    }, [])

    const getChildren = async (id: string) => {
        const { data } = await fetchChildrenTeams(id)
        if (data) setTeams(data)
    }

    return (
        <TeamsContext.Provider
            value={{
                teams,
                getChildrenTeams: (teamId) => getChildren(teamId),
                getInitialTeams,
            }}
        >
            <Home />
        </TeamsContext.Provider>
    )
}

export default App
