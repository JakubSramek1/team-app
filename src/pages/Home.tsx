import { FC } from 'react'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { IEmployee } from '../components/avatars/AvatarGroup'
import EmployeeList from '../components/lists/EmployeeList'
import { Box, Card, CardContent, Grid } from '@mui/material'
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
        const { data } = await fetchAllTeams()
        if (data) {
            const filtered = data.filter((t) => t.parentTeam === null)
            setTeams(filtered)
        }
    }

    const handleClick = async (id: string) => {
        getTeam(id)
        const { data } = await fetchChildrenTeams(id)
        if (data) setTeams(data)
    }

    const getTeam = async (id: string) => {
        const { data } = await fetchTeam(id)
        if (data) {
            setCurrentTeam(data)
            getParentTeam(id)
            getTeamEmployees(id)
        }
    }

    const getParentTeam = async (parentId: string) => {
        const { data } = await fetchParentTeam(parentId)
        if (data) setParentTeam(data)
    }

    const getTeamEmployees = async (teamId: string) => {
        const { data } = await fetchTeamEmployees(teamId)
        if (data) setTeamEmployees(data)
    }

    return (
        <Box>
            {!currentTeam && (
                <Typography variant="h3" align="center" mt={3}>
                    Týmy
                </Typography>
            )}

            {currentTeam && (
                <Grid display="flex" justifyContent="center">
                    <Card
                        sx={{
                            m: 5,
                            width: '500px',
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                transition: '.5s',
                            },
                        }}
                    >
                        <CardContent>
                            <Typography variant="h4" align="center" mb={2}>
                                Informace o týmu
                            </Typography>
                            <Typography variant="body1" align="center">
                                Název týmu: {currentTeam.name}
                            </Typography>
                            <Typography variant="body1" align="center">
                                Datum vytvoření: {currentTeam.createdAt}
                            </Typography>
                            {teamEmployees.length > 0 && (
                                <Typography variant="body1" align="center">
                                    Počet členů týmu: {teamEmployees.length}
                                </Typography>
                            )}
                            <Typography variant="h5" align="center" mt={2}>
                                Členové týmu
                            </Typography>
                            {teamEmployees.length > 0 && (
                                <EmployeeList
                                    employees={teamEmployees}
                                    onUpdate={() =>
                                        getTeamEmployees(currentTeam.id)
                                    }
                                />
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            )}
            {currentTeam && teams.length > 0 && (
                <Typography variant="h4" align="center">
                    Podřazené týmy
                </Typography>
            )}

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
