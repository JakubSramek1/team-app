import { FC } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { IEmployee } from '../components/avatars/AvatarGroup'
import EmployeeList from '../components/lists/EmployeeList'
import { Box } from '@mui/material'

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
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null)
    const [parentTeam, setParentTeam] = useState<ITeam | null>(null)
    const [teamEmployees, setTeamEmployees] = useState<IEmployee[]>([])

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
        getTeam(id)
        const { data, error } = await apiCall(`teams?select=*`)
            .from('')
            .select()
            .eq('parentTeam', id)

        if (data) {
            setTeams(data)
        }
    }

    const getTeam = async (id: string) => {
        const { data, error } = await apiCall('teams?select=*')
            .from('')
            .select()
            .eq('id', id)
            .single()
        if (data) {
            setCurrentTeam(data)
            getParentTeam(id)
            getTeamEmployees(id)
        }
    }

    const getParentTeam = async (parentId: string) => {
        const { data, error } = await apiCall('teams?select=*')
            .from('')
            .select()
            .eq('id', parentId)
            .single()
        if (data) setParentTeam(data)
    }

    const getTeamEmployees = async (teamId: string) => {
        const { data, error } = await apiCall('employees?select=*')
            .from('')
            .select()
            .eq('team', teamId)
        if (data) setTeamEmployees(data)
    }

    return (
        <Box>
            <Typography variant="h2" align="center">
                Teams
            </Typography>
            {currentTeam && (
                <>
                    <Typography variant="h2" align="center">
                        {currentTeam.name}
                    </Typography>
                    <Typography variant="body2" align="center">
                        {currentTeam.createdAt}
                    </Typography>
                    <Typography variant="body2" align="center">
                        {parentTeam?.name || 'nemá nadřazený tým'}
                    </Typography>
                </>
            )}
            {teamEmployees.length > 0 && (
                <EmployeeList employees={teamEmployees} />
            )}
            {teams.map(({ id, name, parentTeam }) => (
                <TeamCard
                    key={id}
                    id={id}
                    name={name}
                    parentTeam={parentTeam}
                    onClick={() => handleClick(id)}
                />
            ))}
        </Box>
    )
}

export default Home
