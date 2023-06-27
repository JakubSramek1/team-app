import { FC } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'

export interface ITeam {
    createdAt: string
    id: string
    name: string
    parentTeam?: string
}

export function apiCall(path: string) {
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || ''
    const backendUrl = process.env.REACT_APP_BACKEND_URL || ''
    return createClient(`${backendUrl}${path}`, supabaseKey)
}

const Home: FC = () => {
    const [data, setData] = useState<ITeam[]>([])
    const [teams, setTeams] = useState<ITeam[]>([])

    useEffect(() => {
        handler()
    }, [])

    const handler = async () => {
        const { data, error } = await apiCall('teams?select=*')
            .from('')
            .select()
        if (data) {
            setData(data)
            const filtered = data.filter((t) => t.parentTeam === null)
            setTeams(filtered)
        }
    }

    const handleClick = async (id: string) => {
        const { data, error } = await apiCall(`teams?select=*`)
            .from('')
            .select()
            .eq('parentTeam', id)

        if (data) setTeams(data)
    }

    return (
        <>
            <Typography variant="h2" align="center">
                Teams
            </Typography>
            {teams.map(({ id, name, parentTeam }) => (
                <TeamCard
                    key={id}
                    id={id}
                    name={name}
                    parentTeam={parentTeam}
                    onClick={() => handleClick(id)}
                />
            ))}
        </>
    )
}

export default Home
