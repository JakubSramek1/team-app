import { createClient } from '@supabase/supabase-js'
import { useEffect, useMemo, useState } from 'react'
import TeamCard from './components/card/TeamCard'
import Typography from '@mui/material/Typography'

export interface ITeam {
    createdAt: string
    id: string
    name: string
    parentTeam?: string
}

const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''
const backendUrl = process.env.REACT_APP_BACKEND_URL || ''

function App() {
    const [teams, setTeams] = useState<ITeam[]>([])

    const parentTeams = useMemo(
        () => teams.filter(({ parentTeam }) => !parentTeam),
        [teams]
    )

    useEffect(() => {
        handler()
    }, [])

    const supabase = createClient(`${backendUrl}teams?select=*`, supabaseKey)

    const handler = async () => {
        const { data, error } = await supabase.from('countries').select()
        if (data) setTeams(data)
    }

    return (
        <div className="App">
            <Typography variant="h2" align="center">
                Teams
            </Typography>
            {parentTeams.map(({ id, name, parentTeam }) => (
                <TeamCard key={id} name={name} parentTeam={parentTeam} />
            ))}
        </div>
    )
}

export default App
