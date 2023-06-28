import { FC } from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { IEmployee } from '../components/avatars/AvatarGroup'
import EmployeeList from '../components/lists/EmployeeList'
import { Box } from '@mui/material'
import {
    fetchAllTeams,
    fetchChildrenTeams,
    fetchParentTeam,
    fetchTeam,
} from '../api/teams'
import { fetchTeamEmployees } from '../api/employees'

export interface ITeam {
    createdAt: string | null
    id: string
    name: string | null
    parentTeam: string | null
}

const Home: FC = () => {
    const [teams, setTeams] = useState<ITeam[]>([])
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null)
    const [parentTeam, setParentTeam] = useState<ITeam | null>(null)
    const [teamEmployees, setTeamEmployees] = useState<IEmployee[]>([])

    useEffect(() => {
        handler()
    }, [])

    const handler = async () => {
        const data = await fetchAllTeams()
        if (data) {
            const filtered = data.filter((t) => t.parentTeam === null)
            setTeams(filtered)
        }
    }

    const handleClick = async (id: string) => {
        getTeam(id)
        const data = await fetchChildrenTeams(id)
        if (data) setTeams(data)
    }

    const getTeam = async (id: string) => {
        const data = await fetchTeam(id)
        if (data) {
            setCurrentTeam(data)
            getParentTeam(id)
            getTeamEmployees(id)
        }
    }

    const getParentTeam = async (parentId: string) => {
        const data = await fetchParentTeam(parentId)
        if (data) setParentTeam(data)
    }

    const getTeamEmployees = async (teamId: string) => {
        const data = await fetchTeamEmployees(teamId)
        if (data) setTeamEmployees(data)
    }

    return (
        <Box>
            <Typography variant="h2" align="center">
                Týmy
            </Typography>

            {currentTeam && (
                <>
                    <Typography variant="h4" align="center">
                        informace o týmu
                    </Typography>
                    <Typography variant="h3" align="center">
                        Název týmu: {currentTeam.name}
                    </Typography>
                    <Typography variant="body2" align="center">
                        Datum vytvoření: {currentTeam.createdAt}
                    </Typography>
                    <Typography variant="body2" align="center">
                        Nadřazený tým:
                        {parentTeam?.name || 'nemá nadřazený tým'}
                    </Typography>
                    {teamEmployees.length > 0 && (
                        <Typography variant="body2" align="center">
                            Počet členů týmu: {teamEmployees.length}
                        </Typography>
                    )}
                    <Typography variant="h4" align="center">
                        Členové týmu
                    </Typography>
                    {teamEmployees.length > 0 && (
                        <EmployeeList employees={teamEmployees} />
                    )}
                </>
            )}
            <Typography variant="h4" align="center">
                Podřazené týmy
            </Typography>

            <Box display="flex" flexDirection="row" mb={6}>
                {teams.map(({ id, name, parentTeam }) => (
                    <TeamCard
                        key={id}
                        id={id}
                        name={name || ''}
                        parentTeam={parentTeam || ''}
                        onClick={() => handleClick(id)}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default Home
