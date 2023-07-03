import { FC, useCallback, useContext } from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import TeamCard from '../components/card/TeamCard'
import { IEmployee } from '../components/avatars/AvatarGroup'
import EmployeeList from '../components/lists/EmployeeList'
import { Card, CardContent, Grid } from '@mui/material'
import { fetchTeam } from '../api/teams'
import { fetchTeamEmployees } from '../api/employees'
import { TeamsContext } from '../context/TeamsContext'

export interface ITeam {
    createdAt: string | null
    id: string
    name: string | null
    parentTeam: string | null
}

const Home: FC = () => {
    const [currentTeam, setCurrentTeam] = useState<ITeam | null>(null)
    const [teamEmployees, setTeamEmployees] = useState<IEmployee[]>([])
    const { teams, getChildrenTeams } = useContext(TeamsContext)

    const handleClick = useCallback((id: string) => {
        getTeam(id)
        getChildrenTeams(id)
        getTeamEmployees(id)
    }, [])

    const getTeam = useCallback(async (id: string) => {
        const { data } = await fetchTeam(id)
        if (data) setCurrentTeam(data)
    }, [])

    const getTeamEmployees = useCallback(async (teamId: string) => {
        const { data } = await fetchTeamEmployees(teamId)
        if (data) setTeamEmployees(data)
    }, [])

    return (
        <>
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

            <Grid display="flex" flexWrap="wrap" flexDirection="row" mb={6}>
                {teams.map(({ id, name, parentTeam }) => (
                    <TeamCard
                        key={id}
                        id={id}
                        name={name || ''}
                        parentTeam={parentTeam || ''}
                        onClick={() => handleClick(id)}
                    />
                ))}
            </Grid>
        </>
    )
}

export default Home
